$(document).ready(function () {
   
    $('.insertAfter').click(function () {
        
        var inputVal = $('#userinput').val();

        $('<li>' + inputVal + '</li>').insertAfter('#brands li:last');

    });

    $('.after').click(function () {
        
        var inputVal = $('#userinput').val();

        $('#brands li:last').after('<li>' + inputVal + '</li>');

    });


    $('.insertBefore').click(function () {
        
        var inputVal = $('#userinput').val();

        $('<li>' + inputVal + '</li>').insertBefore('#brands li:first');

    });


    $('.before').click(function () {
        
        var inputVal = $('#userinput').val();

        $('#brands li:first').before('<li>' + inputVal + '</li>');

    });

    $('.appendTo').click(function () {
        
        var inputVal = $('#userinput').val();

        $('#brands li:first').appendTo('#brands');

    });


    $('.append').click(function () {
        
        var inputVal = $('#userinput').val();

        $('#brands').append($('#brands li:first'));

    });

});