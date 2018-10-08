$(document).ready(function () {
    

    var randomProperties = [
        {
            'left' : '-800',
            'opacity' : '-=0.1'
        },

        {
            'left' : '+=800',
            'opacity' : '+=0.1'
        },

        {
            'top' : '-=800',
            'opacity' : '-=0.1'
        },

        {
            'top' : '+=800',
            'opacity' : '+=0.1'
        }
    ];

    $('.start').on("click", () => {
        $('.text').each( function() {

            console.log('id=>' + $(this).attr('id'));

            $(this).animate( 
               randomProperties[Math.floor(Math.random()*randomProperties.length)], 
               16000
    
            );
        }); 
    });

    $('.stop-one').click( () => {
        $('.text').filter(':animated').first().stop();
    });

    $('.stop-all').click( () => {
        $('.text').filter(':animated').stop();
    });

    /*
    $('.left').on("click", () => {
        $('.text').animate( {

            'left' : ['-=200','swing'],
            'opacity'   :  ['-=0.1', 'swing']      

        }, 2000,
        () => {
            console.log("Move left done");
        });
    });

    $('.right').on("click", () => {
        $('.text').animate( {

            'left' : ['+=200','linear'],
            'opacity'   :  ['+=0.1', 'linear']        

        }, 2000,
        () => {
            console.log("Move right done");
        });
    });

    $('.up').on("click", () => {
        $('.text').animate( {

            'top' : ['-=200','swing'],
            'opacity'   :  ['+=0.1', 'swing']        

        }, Math.abs(Math.random() * 1000),
        () => {
            console.log("Move up done");
        });
    });

    $('.down').on("click", () => {
        var val = Math.abs(Math.random())*200;
        $('.text').animate( {
            
            'top' : ['+='+ val +'','linear'],
            'opacity'   :  ['-=0.1', 'swing']        

        }, Math.abs(Math.random() * 2000),
        () => {
            console.log("Move down done");
        });
    });

    */

}); 