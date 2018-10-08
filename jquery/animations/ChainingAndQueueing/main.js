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


    $('.start').click( function() {
    
        $('.no-queue')
            .slideUp(2000)
            .fadeIn(2000)
            .slideDown(2000)
            .fadeOut(2000)
            .show(2000)
            .addClass('highlight')
            .hide(2000)
            .fadeIn(2000)
            .slideDown(2000)
            .show(2000);

        $('.queue')
            .slideUp(2000)
            .fadeIn(2000)
            .slideDown(2000)
            .fadeOut(2000)
            .show(2000)
            .queue( function() {
                $(this).addClass('highlight');
                $(this).dequeue();
            })
            .hide(2000)
            .fadeIn(2000)
            .slideDown(2000)
            .fadeOut(2000)
            .show(2000);

            $('.queue-again')
            .slideUp(2000)
            .fadeIn(2000)
            .slideDown(2000)
            .fadeOut(2000)
            .show(2000)
            .queue( function(next) {
                $(this).addClass('highlight');
                next();
                
            })
            .hide(2000)
            .fadeIn(2000)
            .slideDown(2000)
            .fadeOut(2000)
            
            .slideDown(2000)
            .slideDown(2000)
            .fadeIn(2000)
            .slideUp(2000)
            .show(2000);
    });

       
});