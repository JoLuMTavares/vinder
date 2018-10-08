$(document).ready(function () {
    $('.article').hide();

    $('.readmore').on("click", function () {
        $('.article').show();
    });

    $('.readless').on("click", function () {
        $('.article').hide();
    });

    $('.readmoreslow').on("click", function () {
        $('.article').show("slow");
    });

    $('.readlessslow').on("click", function () {
        $('.article').hide("slow");
    });


    $('.readmorefast').on("click", function () {
        $('.article').show("fast");
    });

    $('.readlessfast').on("click", function () {
        $('.article').hide("fast");
    });

    $('.readmorecustom').on("click", function () {
        $('.article').show(Math.abs(Math.random())*10000);
    });

    $('.readlesscustom').on("click", function () {
        $('.article').hide(Math.abs(Math.random())*10000);
    });
});