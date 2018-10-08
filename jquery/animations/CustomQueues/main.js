$(document).ready(function () {

    
    
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
    ];


    
    
    $('.text').queue('.fontsize', function (next) {
        $(this).animate({'font-size' : '22px'}, 1000);

        next();
    })
    .queue('.motion', function (next) {
        $(this).animate({'left' : '+=250'}, 1000);

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
});