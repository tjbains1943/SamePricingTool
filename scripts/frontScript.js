$(document).ready(function() {
  $(".mWTab").hide();
  $(".electOTab").hide();
  $(".brandTab").hide();

  var clothingNonClothing = "clothing";
  var mensWomens = "mens";
  var category = "t-shirt";

  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawStuff);

  function drawStuff() {
    var data = new google.visualization.arrayToDataTable([
      ["Price", "Amount"],
      ["Panties", 44],
      ["Non", 31],
      ["Null", 12],
      ["True", 10],
      ["Falso", 3],
    ]);

    var options = {
      title: "Chess opening moves",
      width: 900,
      legend: { position: "none" },
      chart: {
        title: "Pricing Tool",
        subtitle: "Category Graph",
      },
      bars: "horizontal", // Required for Material Bar Charts.
      axes: {
        x: {
          0: { side: "top", label: "Amount" }, // Top x-axis.
        },
      },
      bar: { groupWidth: "90%" },
    };

    var chart = new google.charts.Bar(document.getElementById("top_x_div"));
    chart.draw(data, options);
  }

  $("#graphTab").on("click", function(event) {
    event.preventDefault();
    $("#top_x_div").toggle();
  });

  $("#clothingTab").on("click", function(event) {
    event.preventDefault();
    $(".mWTab").toggle();
  });

  $("#nonClothingTab").on("click", function(event) {
    event.preventDefault();
    $(".electOTab").toggle();
  });

  $("#usedTab").on("click", function(event) {
    event.preventDefault();
    $("#graphTab").text("Used Graph");
  });
  $("#newTab").on("click", function(event) {
    event.preventDefault();
    $("#graphTab").text("New Graph");
  });
  $("#listTab").on("click", function(event) {
    event.preventDefault();
    $(".table").toggle();
  });

  $(".mWTab").on("click", "button", function(event) {
    event.preventDefault();
    console.log(6);
    $(".brandTab").toggle();
  });

  $(".electOTab").on("click", "button", function(event) {
    event.preventDefault();
    console.log(6);
    $(".brandTab").toggle();
  });

  $("").on("click", function() {});

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var baseUrl =
      "https://open.api.ebay.com/shopping?callname=FindProducts&appid=MaureenB-Improved-PRD-a5d7504c4-a5fecda0&version=1015&siteid=0&responseencoding=JSON&MaxEntries=100&HideDuplicateItems=true";
    var brand = $("#input").val();
    var domain = "&DomainName=" + clothingNonClothing;
    var keywords = "$QueryKeywords=" + mensWomens + category + brand;
    var url = baseUrl + domain + keywords;

    $.ajax({
      URL: url,
      method: "GET",
    }).then(function(response) {
      console.log(response);
    });
  });
});
