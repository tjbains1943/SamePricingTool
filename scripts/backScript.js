$(document).ready(function () {
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

  function modes(array) {
    if (!array.length) return [];
    var modeMap = {},
      maxCount = 0,
      modes = [];

    array.forEach(function (val) {
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

  function getData() {
    //debugger;
    queryURL = "https://crossorigin.me/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=MaureenB-Improved-PRD-a5d7504c4-a5fecda0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + item + "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=Condition&itemFilter(1).value=3000&itemFilter(2).name=MinPrice&itemFilter(2).value=10&paginationInput.pageNumber=" + p + "&categoryId=" + category;

    console.log("Entered getData");
    console.log(queryURL);
    console.log(category);
    console.log(item);


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      result = JSON.parse(response);

      // console.log(result);
      //   console.log(result.findCompletedItemsResponse[0].searchResult[0].item.length);

      for (var i = 0; i < result.findCompletedItemsResponse[0].searchResult[0].item.length; i++) {

        var newRow = $("<tr>");
        var picture = $("<td>").html("<img src=" + result.findCompletedItemsResponse[0].searchResult[0].item[i].galleryURL + "alt='img'>");
        var Title = $("<td>").text(result.findCompletedItemsResponse[0].searchResult[0].item[i].title);
        var Price = $("<td>").text(result.findCompletedItemsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__);

        newRow.append(picture);
        newRow.append(Title);
        newRow.append(Price);

        if (result.findCompletedItemsResponse[0].searchResult[0].item[i].shippingInfo[0].hasOwnProperty('shippingServiceCost')) {

          Shipping = $("<td>").text(result.findCompletedItemsResponse[0].searchResult[0].item[i].shippingInfo[0].shippingServiceCost[0].__value__);

          totalNumber = Number(result.findCompletedItemsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__) + Number(result.findCompletedItemsResponse[0].searchResult[0].item[i].shippingInfo[0].shippingServiceCost[0].__value__);
        } else {

          Shipping = $("<td>").text("$0.00");

          totalNumber = Number(result.findCompletedItemsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__) + 0;
        }

        var total = $("<td>").text(totalNumber.toFixed(2));

        newRow.append(Shipping);
        newRow.append(total);
        body.append(newRow);
      }
    });
  }

  // TODO fix this hack, this belongs in a button hndlr on frontscript:
  getData();

});