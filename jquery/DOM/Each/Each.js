$(document).ready(function () {

    var el = $('.box');

    el.click( () => {

        alert('The box was clicked!');

    });

    $('.remove').click( function () {
        $('.box').remove();
    });

    $('.detach').click( function () {
        $('.box').detach();
    });

    $('.empty').click( function () {
        $('.box').empty();
    });

    $('.add').click(function () {
       
        $('#container').append(el);

    });
   
    $('.each').click(function () {
       $('.box').each(function () {
            $(this).addClass('outer-box');   
       });
        

    });

    $('.wrapall').click(function () {
       
        $('.box').wrapAll('<div class="outer-box"></div>');

    });

});