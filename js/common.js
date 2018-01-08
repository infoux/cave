$(document).ready(function() {

  $(".screen button.cave").on("click", function() {
    var switchon = $(this).attr("data");
    
    $(".screen button.cave").removeClass("active");
    $(".screen button."+ switchon).addClass("active");

    $(".screen .cavedata").removeClass("active");
    $(".screen .cavedata."+ switchon).addClass("active");
  });

  $(".screen ul button").on("click", function() {
    var tabon = $(this).attr("data");
    $(".screen ul button").removeClass("active");
    $(this).addClass("active");

    $(".screen .sortdata").removeClass("active");
    $(".screen .sortdata."+ tabon).addClass("active");
  });

  $("header button.menu").on("click", function() {
    $("header nav").toggle();
    $("body").toggleClass("menuOn");
  });

  $(window).on("resize", function() {
    $("header nav").removeAttr("style");
    $("body").removeClass("menuOn");
  })
});
