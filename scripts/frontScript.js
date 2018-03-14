$(document).ready(function() {
  $(".mWTab").hide();
  $(".electOTab").hide();
  $(".brandTab").show();
  $(".table").hide();
  document.getElementById("input").disabled = true;
  
  
  var clothingNonClothing = "clothing";
  var mensWomens = "mens";
  var category = "t-shirt";

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
    $("#displayItems").toggle();
  });
  $("#recentTab").on("click", function(event) {
    event.preventDefault();
    $(".recentItem").toggle();
  });

  $(document).on("click", ".boxers", function(event) {
    event.preventDefault();
    console.log(this.val());
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  })
});
