$(document).ready(function () {

    var el = "";
   
    
    $(".addBtn").click( () => {
        var htmlInput = $("#myInput").val();

        $('#myUL').append("<li>" + htmlInput + "<span class='close'><i class='glyphicon glyphicon-remove'></i></span></li>");

        
    });


    $('.insertAfter').click(function () {
        
        var inputVal = $('#myInput').val();

        $('<li>' + inputVal + '<span class="close"><i class="glyphicon glyphicon-remove"></i></span></li>').insertAfter('#myUL li:last');
        // $("#myInput").attr('');

    });

    $('.after').click(function () {
        
        var inputVal = $('#myInput').val();

        $('#myUL li:last').after('<li>' + inputVal + '<span class="close"><i class="glyphicon glyphicon-remove"></i></span></li>');

    });


    $('.insertBefore').click(function () {
        
        var inputVal = $('#myInput').val();

        $('<li>' + inputVal + '<span class="close"><i class="glyphicon glyphicon-remove"></i></span></li>').insertBefore('#myUL li:first');

    });


    $('.before').click(function () {
        
        var inputVal = $('#myInput').val();

        $('#myUL li:first').before('<li>' + inputVal + '<span class="close"><i class="glyphicon glyphicon-remove"></i></span></li>');

    });

    $('.appendTo').click(function () {
        
        var inputVal = $('#myInput').val();

        $('#myUL li:first').appendTo('#myUL');

    });


    $('.append').click(function () {
        
        var inputVal = $('#myInput').val();

        $('#myUL').append($('#myUL li:first'));

    });


    $('.removeFirst').click( () => {
        el = $('#myUL li:first');
        $('#myUL li:first').remove();
        console.log('​el', el);
    });


    $('.removeLast').click( () => {
        el = $('#myUL li:last');
        $('#myUL li:last').remove();
        console.log('​el', el);

    });
/*
    $('li').click(function() {

        $(this).toggleClass('checked');

    });
*/
    $('.close').click( function() {
        el = $(this).parent();
        $(this).parent().remove();

    });


    $('.addBack').click( function() {
        console.log('​el', el);
        $('#myUL').append($(el));

    });
    // $('li').toggle().style.text-decoration = 'line-through';


    $('#myUL').on('click', '.close', function () {
       
        $(this).parent().remove();

    });


    $('#myUL').on('click', 'li', function () {
       
        $(this).toggleClass('checked');

    });
});