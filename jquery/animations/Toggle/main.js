$(document).ready(function () {
    $('.article').hide();

    $('.readmore').on("click", function () {
        $('.article').toggle();
    });

    $('.readmoreslow').on("click", function () {
        $('.article').toggle("slow");
    });

    $('.readmorefast').on("click", function () {
        $('.article').toggle("fast");
    });

    $('.readmorecustom').on("click", function () {
        $('.article').toggle(Math.abs(Math.random())*10000);
    });


    $('.readmoreslide').on("click", function () {
        $('.article').slideToggle();
    });

    $('.readmoreslideslow').on("click", function () {
        $('.article').slideToggle("slow");
    });

    $('.readmoreslidefast').on("click", function () {
        $('.article').slideToggle("fast");
    });

    $('.readmoreslidecustom').on("click", function () {
        $('.article').slideToggle(Math.abs(Math.random())*10000);
    });


    $('.readmorefade').on("click", function () {
        $('.article').fadeToggle();
    });

    $('.readmorefadeslow').on("click", function () {
        $('.article').fadeToggle("slow");
    });

    $('.readmorefadefast').on("click", function () {
        $('.article').fadeToggle("fast");
    });

    $('.readmorefadecustom').on("click", function () {
        $('.article').fadeToggle(Math.abs(Math.random())*10000);
    });

});