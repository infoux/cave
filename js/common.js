$(document).ready(function() {

  $(".screen button.cave").on("click", function() {
    var switchon = $(this).attr("data");
    
    $(".screen button.cave").removeClass("active");
    $(".screen button."+ switchon).addClass("active");

    $(".screen .cavedata").removeClass("active");
    $(".screen .cavedata."+ switchon).addClass("active");

    $("#map").removeAttr("class");
    $("#map").addClass(switchon);
    $("#map .cave-map").removeClass("active");
    $("#map .cave-map."+ switchon).addClass("active");


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

  $(".screen-sub header div.select button.active").on("click", function() {
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

    try {

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

    } catch(e) {}
  
    $(".screen-sub .icon-resize-full").on("click", function() {
      $(this).parent().parent().addClass("active");
      $(".screen-sub .data-set section").addClass("full");

    });


    $(".screen-sub .icon-resize-small").on("click", function() {
      
      $(this).parent().parent().removeClass("active");
      $(".screen-sub .data-set section").removeClass("full");

    });


    $(".cave-map .map a").on("mouseenter", function() {
      $(".cave-map .map li").removeAttr("style");
      $(this).parent().css("z-index", "10");
    });



    $(".modal .head .close").on("click", function() {
      $(".modal").toggle();
    });



    $(".screen-sub header div").on("mouseenter", function() {
        $(this).addClass("open");
    });
    $(".screen-sub header div").on("mouseleave", function() {
      $(this).removeClass("open");
  });

  $(".screen .scroll-data").each(function(){
    var calheight = $(window).height() - $(".tabdata nav").height() - $("ul.subtab").height() - $(".screen .nowdata").height() - 56;
    $(this).css('height', calheight);

    console.log(calheight);
  });



  $(".screen-sub header button.home").on("mouseenter", function() {
    $(".screen-sub header button.home, .screen-sub header button.intro").addClass("on");

  });
  $(".screen-sub header button.home").on("mouseleave", function() {
    setTimeout(function() {
      $(".screen-sub header button.home, .screen-sub header button.intro").removeClass("on");
    }, 5000);


  });




    /* ???????????? */
    $(".cave-map li a").on("click", function() {
      $(".modal").toggle();
    });



});
