$(document).ready(function() {
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
  var clothing = false;
  var nonClothing = false;

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
    if (clothing === true) {
      $("#itemsTable").empty();
      item = $("#input").val();
      console.log(item);
      getData();
      $("#input").val("");
      clothing = false;
    }
    if (nonClothing === true) {
      $("#itemsTable").empty();
      item = $("#input").val();
      getBestBuyData();
      $("#input").val("");
      nonClothing = false;
    }
  });

  function getBestBuyData() {
    queryURL =
      "https://api.bestbuy.com/v1/products((search=" +
      item +
      ")&(categoryPath.id=" +
      categoryId +
      "))?apiKey=aZbPaFdEwGA1IMWTXeQt0ONL&sort=image.asc&show=image,modelNumber,name,regularPrice,shipping,thumbnailImage&format=json&pageSize=100";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
      for (let i = 0; i < response.products.length; i++) {
        var newRow = $("<tr>");
        var picture = $("<td>").html(
          "<img src=" +
            response.products[i].image +
            " alt='img' 'height=100px' width='100px'>"
        );
        var Title = $("<td>").text(response.products[i].name);
        var Price = $("<td>").text(response.products[i].regularPrice);
        var recent = $("<button>");
        recent.html(Title);
        recent.addClass("boxers");
        newRow.append(picture);
        newRow.append(recent);
        newRow.append(Price);

        var Shipping = $("<td>").text("$0.00");
        var Total = $("<td>").text(response.products[i].regularPrice);

        newRow.append(Shipping);
        newRow.append(Total);
        body.append(newRow);
      }
      item = "";
      console.log(response);
    });
  }
  function getData() {
    //debugger;
    queryURL =
      "https://crossorigin.me/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=MaureenB-Improved-PRD-a5d7504c4-a5fecda0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" +
      item +
      "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true" +
      condition +
      "&paginationInput.pageNumber=1&categoryId=" +
      categoryId;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
      result = JSON.parse(response);
      drawStuff();

      for (
        var i = 0;
        i < result.findCompletedItemsResponse[0].searchResult[0].item.length;
        i++
      ) {
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

        newRow.append(Shipping);
        newRow.append(total);
        body.append(newRow);
      }
      item = "";
    });
  }

  $("#menSelect").on("change", function() {
    $("#womenSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    $("#electronicsSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    document.getElementById("input").disabled = false;
  });
  $("#womenSelect").on("change", function() {
    $("#menSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    $("#electronicsSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    document.getElementById("input").disabled = false;
  });
  $("#otherSelect").on("change", function() {
    $("#menSelect").prop("selectedIndex", 0);
    $("#womenSelect").prop("selectedIndex", 0);
    $("#electronicsSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    nonClothing = true;
  });
  $("#electronicsSelect").on("change", function() {
    $("#menSelect").prop("selectedIndex", 0);
    $("#womenSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    categoryId = $(this).val();
    nonClothing = true;
    document.getElementById("input").disabled = false;
  });
});
