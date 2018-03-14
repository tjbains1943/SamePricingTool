$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCeu8LNzpEl4vmP-_Gm4pRL04krzERMLDs",
    authDomain: "pricingtool-7ba32.firebaseapp.com",
    databaseURL: "https://pricingtool-7ba32.firebaseio.com",
    projectId: "pricingtool-7ba32",
    storageBucket: "",
    messagingSenderId: "53201548843",
  };

  var item = "anthropologie";
  var category = "63861";
  var highest = 0;
  var lowest = 100000;
  var totals = [];
  var totalsRound = [];
  var Shipping = "";
  var totalNumber = "";
  var runningTally = 0;
  var queryURL = "";
  var body = $("#itemsTable");
  var head = $("#pricingTable");
  var freq;
  var freqVal;
  var p = 1;
  var result = {};

  var categoryId;
  var conditionUsed = "&itemFilter(1).name=Condition&itemFilter(1).value=3000";
  var conditionNew = "&itemFilter(1).name=Condition&itemFilter(1).value=1000";
  var condition = "&itemFilter(1).name=Condition&itemFilter(1).value=3000";

  function modes(array) {
    if (!array.length) return [];
    var modeMap = {},
      maxCount = 0,
      modes = [];

    array.forEach(function(val) {
      if (!modeMap[val]) modeMap[val] = 1;
      else modeMap[val]++;

      if (modeMap[val] > maxCount) {
        modes = [val];
        maxCount = modeMap[val];
      } else if (modeMap[val] === maxCount) {
        modes.push(val);
        maxCount = modeMap[val];
      }
    });
    return modes;
  }

  $('input[type="checkbox"]').on("click", function() {
    if (this.checked) {
      condition = conditionNew;

      console.log("new");
      console.log(condition);
    } else {
      condition = conditionUsed;

      console.log("unchecked");
      console.log(condition);
    }
  });

  $("#submit").on("click", function() {
    $("#itemsTable").empty();
    item = $("#input").val();
    console.log(item);
    getData();
    $("#input").val("");
  });

  function getData() {
    //debugger;
    queryURL =
      "https://crossorigin.me/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=MaureenB-Improved-PRD-a5d7504c4-a5fecda0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" +
      item +
      "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true" +
      condition +
      "&paginationInput.pageNumber=1&categoryId=" +
      categoryId;

    console.log("Entered getData");
    console.log(queryURL);
    console.log(category);
    console.log(item);
    console.log(condition);

    google.charts.load("current", { packages: ["bar"] });

    function drawStuff() {
      var data = new google.visualization.DataTable();

        data.addColumn('string', 'price');
        data.addColumn('number', 'frequencyValue');

        // load data
      for (var j = 0; j < freq.length; j++) {
          var row = [freq[j].toString(), freqVal[j]];
          data.addRow(row);
        }

      var options = {
        title: "Frequency Graph",
        hAxis: {
          title: 'Number Sold',
          minValue: 0
        },
        legend: { position: "none" },
        chart: {
          title: "Frequency Graph",
        },
        bars: "horizontal", // Required for Material Bar Charts.
        axes: {
          x: {
            0: { side: "Price", label: "Number Sold" }, // Top x-axis.
          },
        },
        bar: { groupWidth: "90%" },
      };

      var chart = new google.charts.Bar(document.getElementById("top_x_div"));
      chart.draw(data, options);
    }

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
      result = JSON.parse(response);

      
console.log(result);
console.log(result.findCompletedItemsResponse[0].searchResult[0].item.length);

      for ( var i = 0; i < result.findCompletedItemsResponse[0].searchResult[0].item.length; i++) {
        var newRow = $("<tr>");
        var picture = $("<td>").html(
          "<img src=" +
            result.findCompletedItemsResponse[0].searchResult[0].item[i]
              .galleryURL +
            "alt='img'>"
        );
        var Title = $("<td>").text(
          result.findCompletedItemsResponse[0].searchResult[0].item[i].title
        );
        var Price = $("<td>").text(
          result.findCompletedItemsResponse[0].searchResult[0].item[i]
            .sellingStatus[0].currentPrice[0].__value__
        );
        var recent = $("<button>");
        recent.html(Title);
        recent.addClass("boxers");
        newRow.append(picture);
        newRow.append(recent);
        newRow.append(Price);

        if (
          result.findCompletedItemsResponse[0].searchResult[0].item[
            i
          ].shippingInfo[0].hasOwnProperty("shippingServiceCost")
        ) {
          Shipping = $("<td>").text(
            result.findCompletedItemsResponse[0].searchResult[0].item[i]
              .shippingInfo[0].shippingServiceCost[0].__value__
          );

          totalNumber =
            Number(
              result.findCompletedItemsResponse[0].searchResult[0].item[i]
                .sellingStatus[0].currentPrice[0].__value__
            ) +
            Number(
              result.findCompletedItemsResponse[0].searchResult[0].item[i]
                .shippingInfo[0].shippingServiceCost[0].__value__
            );
        } else {
          Shipping = $("<td>").text("$0.00");

          totalNumber =
            Number(
              result.findCompletedItemsResponse[0].searchResult[0].item[i]
                .sellingStatus[0].currentPrice[0].__value__
            ) + 0;
        }

        var total = $("<td>").text(totalNumber.toFixed(2));
        //create arrays for math and graphs
        totals.push(totalNumber);
        totalsRound.push(Math.round(totalNumber));

        newRow.append(Shipping);
        newRow.append(total);
        body.append(newRow);
      }
      item = "";
      function createFreq(arry) {
        var a = [], b = [], prev;
        arry.sort(function (a, b) { return a - b });
        console.log(arry);

        for (var k = 0; k < arry.length; k++) {
          if (arry[k] !== prev) {
            a.push(arry[k]);
            b.push(1);
          } else {
            b[b.length - 1]++;
          }
          prev = arry[k];
        }

        freq = a;
        console.log(freq);
        freqVal = b;
        console.log(freqVal);
      }

      createFreq(totalsRound);

      drawStuff();

      $(window).resize(function () {
        drawStuff();
      });
    });
  }


  $("#menSelect").on("change", function() {
    $("#womenSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    document.getElementById("input").disabled = false;
  });
  $("#womenSelect").on("change", function() {
    $("#menSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    document.getElementById("input").disabled = false;
  });
  $("#otherSelect").on("change", function() {
    $("#menSelect").prop("selectedIndex", 0);
    $("#womenSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    document.getElementById("input").disabled = false;
  });
});
