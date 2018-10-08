$(document).ready(function () {
    console.log("Document is ready: hallo world."); 

    $("#clickbutton").click((e) => {
        $("#user-3").slideToggle("slow");
        alert("This is the click handler.");
        
    });

    $("#clickbutton").click((e) => {
        alert("This is the 2nd click handler.");
    });

    $('#bindbutton').bind("click", (e) => {
        alert("This is the bind handler.");
    });

    $('#onbutton').on("click", (e) => {
        alert("This is the 'on' handler.");
    });

    $("li").on("click", function(e) {
        alert($(this).html());
    });

    /*
        Task:
        Create a click event for the links that makes it
        possible that the user cannot open an evil link,
        i.e. a link that does not contain the word evil.

    */

    $('a[href*="evil"]').click( e => {
        e.preventDefault();
        alert("Don't open this one. Just run away from it.");
    });

});