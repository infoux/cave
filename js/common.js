$(document).ready(function() {

  $(".screen button.cave").on("click", function() {
    var switchon = $(this).attr("data");
    
    $(".screen button.cave").removeClass("active");
    $(".screen button."+ switchon).addClass("active");

    $(".screen .cavedata").removeClass("active");
    $(".screen .cavedata."+ switchon).addClass("active");

    $("#map").removeAttr("class");
    $("#map").addClass(switchon);

    $("h1 p").html($(this).html());

  });

  $(".screen ul.tabs button").on("click", function() {
    var tabon = $(this).attr("data");
    $(this).parent().parent().find("button").removeClass("active");
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
  });

  $(".screen-sub header nav button.active").on("click", function() {
    $(this).parent().toggleClass("on");
  });

try {

    var issueSlider = $('.issue .slider').bxSlider({
      pager: false,
      controls: false,
      auto:true,

      onSlideBefore: function(){
        var current = issueSlider.getCurrentSlide();
        current += 1;
        currents = "cave0"+ current; 
        
        $(".issue .map button").removeClass("active");
        $(".issue .map button."+ currents).addClass("active");
      }

    });
} catch(e) {

}

    $(".issue .map button").on("click", function() {
      var gotoNum = $(this).attr("data");
      var gotoNums = gotoNum.charAt(gotoNum.length-1) - 1;
      issueSlider.goToSlide(gotoNums);
    });

    $(".issueNext").on("click", function() {
      issueSlider.goToNextSlide();
      return false;
    });

    $(".issuePrev").on("click", function() {
      issueSlider.goToPrevSlide();
      return false;
    });


    if ($("body").hasClass("screen-sub")) {

      $('.input-date').dateRangePicker({
        separator: ' ~ ',
        language: 'ko',
        getValue: function () {
          return $(this).find("strong").html();
        },
        setValue: function (s) {
          $(this).find("strong").html(s);
        }
  
      });
  
    }

    $(".screen-sub .icon-resize-full").on("click", function() {
      
      $(this).parent().parent().addClass("active");
      $(".screen-sub .data-set section").addClass("full");

    });


    $(".screen-sub .icon-resize-small").on("click", function() {
      
      $(this).parent().parent().removeClass("active");
      $(".screen-sub .data-set section").removeClass("full");

    });

});
