$(document).ready(function () {
    $('.article').hide();

    $('.readmore').on("click", function () {
        $('.article').fadeIn();
    });

    $('.readless').on("click", function () {
        $('.article').fadeOut();
    });

    $('.readmoreslow').on("click", function () {
        $('.article').fadeIn("slow");
    });

    $('.readlessslow').on("click", function () {
        $('.article').fadeOut("slow");
    });


    $('.readmorefast').on("click", function () {
        $('.article').fadeIn("fast");
    });

    $('.readlessfast').on("click", function () {
        $('.article').fadeOut("fast");
    });

    $('.readmorecustom').on("click", function () {
        $('.article').fadeIn(Math.abs(Math.random())*10000);
    });

    $('.readlesscustom').on("click", function () {
        $('.article').fadeOut(Math.abs(Math.random())*10000);
    });
});