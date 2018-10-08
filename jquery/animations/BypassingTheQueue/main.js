$(document).ready(function () {

    
    /*
    var randomProperties = [

        {
            'left' : '-=200',
            'opacity' : '-=0.1'
        },

        {
            'left' : '+=200',
            'opacity' : '+=0.1'
        },

        {
            'top' : '-=50',
            'opacity' : '-=0.1'
        },

        {
            'top' : '+=300',
            'opacity' : '+=0.1'
        }
    ]; */


    $('.start').click(function () {
        
        $('.text')
        .fadeIn(1500, '0.5')
        .slideUp()
        .slideDown()
        .queue(function (next) {
            
            $(this).animate({'left' : '+=250'}, 1000);
            next();
        })

        .animate({

            'font-size' : '99px',
        },
        {
            'duration' : 4000,
            'queue' : false,
            'start' : function () { console.log('Font size animation start')},
            'easing' : 'linear'
        });

    });
    
    /*
    $('.text').queue('.fontsize', function (next) {
        $(this).animate({'font-size' : '22px'}, 1000);

        next();
    })
    
    .queue('.fontsize', function (next) {
        $(this).animate({'font-size' : '66px'}, 1000);

        next();
    })
    .queue('.motion', function (next) {
        $(this).animate({'left' : '+=100'}, 1000);

        next();
    })
    .queue('.fontsize', function (next) {
        $(this).animate({'font-size' : '88px'}, 1000);

        next();
    })
    .queue('.motion', function (next) {
        $(this).animate({'left' : '-=200'}, 1000);

        next();
    })  
    .queue('.fontsize', function (next) {
        $(this).animate({'font-size' : '55px'}, 1000);

        next();
    })
    .queue('.motion', function (next) {
        $(this).animate({'left' : '-=80'}, 1000);

        next();
    });

    $('.fontsize').click( function () {
        $('.text').dequeue('.fontsize');
    });


    $('.motion').click( function () {
        $('.text').dequeue('.motion');
    });
    */
});