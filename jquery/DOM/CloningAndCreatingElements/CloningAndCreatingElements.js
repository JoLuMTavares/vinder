$(document).ready(function () {
   
   
    var classNames = ['.red', '.green', '.blue', '.yellow', '.brown'];


    $('.clone').click(function(){
        var className = classNames[Math.floor(Math.random() * classNames.length)];
        console.log(className);
        $(className).first().clone().appendTo($('#colorboxes'));
     });

    $('.createpink').click(function () {
        
        $('<div class="pink box"></div>').insertAfter('#colorboxes div:last');

    });


    $('.createpurple').click(function () {
        
        var newBox = $('<div class="purple box"></div>');

        $('#colorboxes').append(newBox);

    });

    $('.createrandom').click(function () {

        var colors = ['red', 'green', 'blue', 'yellow', 'brown'];
        
        var className = colors[Math.floor(Math.random() * colors.length)];

        var randBox = $('<div class="' + className + ' box"></div>');

        $('#colorboxes').append(randBox);

    });

});