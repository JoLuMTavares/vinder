$(document).ready(function () {

    $('#smaller').click( (e) => {
        // alert("Hi. I'm the smaller.");

        var fontSizeText = $('.fontbox').css('font-size');

        console.log(fontSizeText);
        console.log(fontSizeText.length);

        var fontSize = parseInt(fontSizeText.substring(0, fontSizeText.length-2));

        fontSize = Math.max(6, fontSize-1);
        console.log("Changing font size to: " + fontSize);

        $('.fontbox').css('font-size', fontSize + 'px');

    });

    $("#bigger").click( (e) => {
        // alert("Hi. I'm the smaller.");

        var fontSizeText = $('.fontbox').css('font-size');

        var fontSize = parseInt(fontSizeText.substring(0, fontSizeText.length-2));

        fontSize = Math.min(80, fontSize+1);

        $('.fontbox').css('font-size', fontSize + 'px');

    });

    $('#manyProperties').click(() => {

        var colors = ['red', 'blue', 'green', 'yellow', 'grey', 'pink', 'brown', 'fuchsia'];

        var fonts = ['Arial', 'Times', 'Georgia', 'Verdana', 'Calibri', 'Comic Sans'];

        var properties = $('.propertiesbox').css(['color', 'background-color', 'font-family']);
        console.log('​properties', properties);
        
        $('.propertiesbox').css({

            'color' : colors[Math.floor(Math.random()*colors.length)],
            'background-color' : colors[Math.floor(Math.random()*colors.length)],
            'font-family' : fonts[Math.floor(Math.random()*fonts.length)]
        });

    });

});