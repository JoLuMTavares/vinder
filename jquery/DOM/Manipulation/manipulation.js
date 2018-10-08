$(document).ready(function () {
   
    $('.updatehtml').click( () =>  {
        console.log($(".htmlmarkup").val());

        var htmlMarkup = $('input').val();

        $('.text').html(htmlMarkup);
    });

    $('.updatetext').click( () => {
        var htmlMarkup = $('input').val();

        $('.text').text(htmlMarkup);
    });

});