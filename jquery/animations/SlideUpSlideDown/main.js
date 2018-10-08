$(document).ready(function () {
    $('.article').hide();

    $('.readmore').on("click", function () {
        $('.article').slideDown();
    });

    $('.readless').on("click", function () {
        $('.article').slideUp();
    });

    $('.readmoreslow').on("click", function () {
        $('.article').slideDown("slow");
    });

    $('.readlessslow').on("click", function () {
        $('.article').slideUp("slow");
    });


    $('.readmorefast').on("click", function () {
        $('.article').slideDown("fast");
    });

    $('.readlessfast').on("click", function () {
        $('.article').slideUp("fast");
    });

    $('.readmorecustom').on("click", function () {
        $('.article').slideDown(Math.abs(Math.random())*10000);
    });

    $('.readlesscustom').on("click", function () {
        $('.article').slideUp(Math.abs(Math.random())*10000);
    });
});