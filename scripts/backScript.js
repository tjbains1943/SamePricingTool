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
  queryURL = "https://crossorigin.me/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=MaureenB-Improved-PRD-a5d7504c4-a5fecda0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + item + "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=Condition&itemFilter(1).value=3000&itemFilter(2).name=MinPrice&itemFilter(2).value=10&paginationInput.pageNumber=" + p + "&categoryId=" + category;

  console.log(queryURL);
  console.log(category);
  console.log(item);
  
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        result = JSON.parse(response);
        //   console.log(result);
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

          if (totalNumber.toFixed(2) > Number(highest)) {
            console.log(highest);
            console.log(totalNumber);
            highest = totalNumber.toFixed(2);
            console.log("New high price: " + totalNumber.toFixed(2));
          }

          if (totalNumber.toFixed(2) < Number(lowest)) {
            console.log(lowest);
            console.log(totalNumber);
            lowest = totalNumber.toFixed(2);
            console.log("New low price: " + totalNumber.toFixed(2));
          }

          totals.push(totalNumber);
          totalsRound.push(Math.round(totalNumber));
          //   console.log(totalNumber);
          runningTally += totalNumber;
          //   console.log(runningTally.toFixed(2));
        }

        console.log(totals);
        console.log(totalsRound);
        totals.sort(function (a, b) {
          return a - b;
        });
        totalsRound.sort(function (a, b) {
          return a - b;
        });
        console.log(totals);
        console.log(totalsRound);

        createFreq(totalsRound);

        var lowMiddle = Math.floor((totals.length - 1) / 2);
        console.log("lowMiddle " + lowMiddle);
        var highMiddle = Math.ceil((totals.length - 1) / 2);
        console.log("highMiddle " + highMiddle);
        var mean = runningTally.toFixed(2) / result.findCompletedItemsResponse[0].searchResult[0].item.length;
        console.log("mean " + mean);
        var median = (totals[lowMiddle] + totals[highMiddle]) / 2;
        console.log("median " + median);


        var importantRow = $("<tr>");

        var priceRange = $("<td>").text(lowest + "-" + highest);
        var meanPrice = $("<td>").text(mean.toFixed(2));
        var medianPrice = $("<td>").text(median.toFixed(2));
        var modePrice = $("<td>").text(modes(totals));
        var roundedMode = $("<td>").text(modes(totalsRound));
        var numberOfItems = $("<td>").text(result.findCompletedItemsResponse[0].searchResult[0].item.length);

        importantRow.append(numberOfItems);
        importantRow.append(priceRange);
        importantRow.append(meanPrice);
        importantRow.append(medianPrice);
        importantRow.append(modePrice);
        importantRow.append(roundedMode);
        head.append(importantRow);
      }