$(document).ready(function () {
    $('.article').hide();

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

}); 