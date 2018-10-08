$(document).ready(function () {
    $('.article').hide();

    $('.small').on("click", () => {
        $('.text').animate( {

            'font-size' : '16px',
            'opacity'   :  0.1        

        }, 2000,
        () => {
            console.log("Make Small done");
        });
    });

    $('.medium').on("click", () => {
        $('.text').animate( {

            'font-size' : '44px',
            'opacity'   :  0.5        

        }, 2000,
        () => {
            console.log("Make Medium done");
        });
    });

    $('.big').on("click", () => {
        $('.text').animate( {

            'font-size' : '88px',
            'opacity'   :  1.0        

        }, Math.abs(Math.random() * 1000),
        () => {
            console.log("Make Big done");
        });
    });

}); 