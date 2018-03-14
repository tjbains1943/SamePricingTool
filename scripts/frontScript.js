$(document).ready(function() {
  $(".mWTab").hide();
  $(".electOTab").hide();
  $(".brandTab").show();

  var clothingNonClothing = "clothing";
  var mensWomens = "mens";
  var category = "t-shirt";

  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawStuff);

  function drawStuff() {
    var data = new google.visualization.arrayToDataTable([
      ["Price", "Amount"],
      ["boxers", 44],
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
    $("#menSelect").prop("selectedIndex", 0);
    $("#womenSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    $(".electOTab").hide();
    $(".mWTab").toggle();
  });

  $("#nonClothingTab").on("click", function(event) {
    event.preventDefault();
    $("#menSelect").prop("selectedIndex", 0);
    $("#womenSelect").prop("selectedIndex", 0);
    $("#otherSelect").prop("selectedIndex", 0);
    $(".mWTab").hide();
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

  $(document).on("click", ".boxers", function(event) {
    event.preventDefault();
    console.log("p");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  })
});
