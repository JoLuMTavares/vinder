$(document).ready(function () {
   console.log("Document is ready: hallo world."); 

   $('h1').addClass('red-color');

   $('#firstpara').addClass('blue-color');

   $('.para-class').addClass('green-color');


    /*
        1. Make all list items with the name "theking" red-color
        2. Make all list items of class company and of class ceo
            underline.
        3. Give all li items that are direct children of the element
            with id "companies" a border.
        4. Highlight all list items of class "company", if they have
            an index greater than 0.
        5. Make all list items which are children of ULs of class
            flagship blue.

    */

    $("li[name='theking']").addClass("red-color");

    // $("[name='theking']").addClass("red-color"); // Also works

    $(".company, .ceo").addClass("underline");

    $("#companies > li").addClass("border");

    $("li.company:gt(0)").addClass('highlight');

    $("ul.flagship").addClass("blue-color");

    /* EXTRA EFFECTS FROM ME */

    $(".flagship").click(() => {
        $("ul.flagship").fadeOut("slow");
    });

    $("li.flagship").click(() => {
        $("ul.flagship").fadeIn("slow");
    });

    $("li.ceo").click(() => {
        $(".slider").slideToggle("slow");
    });

    /*
        1.  Make all rows with an even index cornflowerblue.

        2.  Make the rest of 1 yellow 

        3.  Make the TDs inside the TRs with an even index 
            cornflowerblue.

        4.  Make the TDs inside the TRs with an odd index 
            yellow.

        5.  Highlight all TDs that contain "Hagrid" (highlight-2).

        6.  Highlight all non-human with index = 1.

        7.  Highlight all non-human with index > 1.

        8.  Highlight all non-human with index < 1.

    */

    $("tr:even").addClass("blue-color");

    $("tr:odd").addClass("golden-background");

    $("tr > td:even").addClass("blue-color");

    $("tr > td:odd").addClass("golden-background");

    $("tr > td:contains(Hagrid)").addClass("highlight-2");

    $("tr.non-human:eq(1)").addClass("highlight");

    $("tr.non-human:gt(1)").addClass("highlight");

    $("tr.non-human:lt(1)").addClass("highlight");

    /*

        1.  Make the parent of the father red
        2.  Make all parents of the son blue
        3.  Make all parents of the son red, until
            the great-grandfather
        4.  Make the closest div to the daughter green
        5.  Make the closest div to the mother green
        6.  Make all children of the father green
        7.  Make the next sibling of the great-grandfather red
        8.  Make the great-grandfather blue, from the
            perspective of the great-grandmother
        9.  Make all siblings next to the great-grandfather red
        10. Make the first sibling next to the great-grandfather red
        11. Make the last sibling next to the great-grandfather blue
        12. Make all siblings left of the great-grandaunt blue


    */

    $("div.father").parent().addClass("red-color");

    $("div.son").parents().addClass("blue-color");

    $("div.son").parentsUntil("div.great-grandfather").addClass("red-color");

    $("div.daughter").closest('div').addClass("green-color");

    $("div.mother").closest('div').addClass("green-color");

    $("div.father").children().addClass("green-color");

    $("div.great-grandfather").next().addClass("red-color");

    $("div.great-grandmother").prev().addClass("blue-color");

    $("div.great-grandfather").nextAll().addClass("red-color");

    $("div.great-grandfather").nextAll().first().addClass("golden-color");

    $("div.great-grandfather").nextAll().last().addClass("blue-color");

    $("div.great-grandfather").prevAll().addClass("blue-purple");

    // This one has a different (or better) effect
    // $("div.great-grandfather").prev().nextAll().addClass("blue-purple");
   
});




