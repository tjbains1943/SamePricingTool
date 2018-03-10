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

  $(".mWTab").on("click", "select", function(event) {
    event.preventDefault();
    $(".brandTab").toggle();
  });

  $(".electOTab").on("click", "select", function(event) {
    event.preventDefault();
    $(".brandTab").toggle();
  });
  $("#menInitialOption").on("click", "select", function(event) {
    event.preventDefault();
    $(".brandTab").toggle();
  });
  $("#womenInitialOption").on("click", "select", function(event) {
    event.preventDefault();
    $(".brandTab").toggle();
  });

});
