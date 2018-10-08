$(document).ready(function () {
    console.log("Document is ready: hallo world."); 

    /*

    1.  Select the li with the id "chaos" and from there, find your way
        to the div with the id "a-level0" and print out the id using the
        attr() method.

    2.  Select the li with the id "chaos" and from there, find your way 
        to replace the placeholders $HALLOWORLD1, $HALLOWORLD2 and 
        $HALLOWORLD3 by "Hallo World 1", "Hallo World 2" and "Hallo World 3"
        respectively. Use the html() method that behaves identically to the 
        VanillaJS "innerHTML" attribute.

        // Perform both tasks in one chain

    */

    console.log($("#chaos").parent().closest("div").parent().attr("id"));
/*
    $("#chaos").parentsUntil("li#a-level0").next().children().first().html("Hallo World 1");

    $("#chaos").parentsUntil("li#a-level0").next().children("#p2").html("Hallo World 2");

    $("#chaos").parentsUntil("li#a-level0").next().children().last().html("Hallo World 3");
*

    $("#chaos").parentsUntil("li#a-level0").next().children()
        .first().html("Hallo World 1")
        .next().html("Hallo World 2")
        .next().html("Hallo World 3");
*
        $("#chaos").closest("#a-level0").next().children()
        .first().html("Hallo World 1")
        .next().html("Hallo World 2")
        .next().html("Hallo World 3");

*/

    $("#chaos").parent().closest("div")
        .parent()
        .next()
        .find("#p1")
        .html("ABC")
        .end()
        .find("#p2")
        .html("DEF")
        .end()
        .find("#p3")
        .html("GHI")
        

});