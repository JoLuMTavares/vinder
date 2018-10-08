$(document).ready(function () {
   
    $('.add').click(function () {
        
        var attributes = $('.text').attr('id');

        $('.text').attr('id', 'differentid'); // Attribute property values
        $('.text').attr('title', 'New Ferrari');

        console.log(attributes);

    });


    $('.remove').click(function () {
        
        $('#differentid').removeAttr('style');

    });

});