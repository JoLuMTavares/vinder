$(document).ready(function () {
    console.log("Document ready.");

    var users = [];

    var id = 0; // Id for each user to be stored

    var user = {
        name        : "",
        picture     : "",
        status      : "",
        gender      : "",
        age         : "",
        height      : "",
        nationality : "",
        languages   : [],
        nutrition   : "",
        drinking    : "",
        smoking     : "",
        drugs       : "",
        animals     : "",
        tidiness    : "",
        workStatus  : "",
        behavior    : "",
        matches     : []
    };

    // +++++++++++ Personal Information

    // Moving to the card with more personal information
    $("#moveToSecondPersonal").click(function () {
    //    var name = new String($("#single").val());
        user.status = $('input[name=relStatus]:checked').val();
        $("#firstPersonalInfo").hide();
        $("#secondPersonalInfo").show();
    });

    

    // +++++++++++ More Personal Information


    // Moving to the first card with personal information
    $("#backToFirstPersonal").click(function () {
        
        $("#secondPersonalInfo").hide();
        $("#firstPersonalInfo").show();
    });


    // Moving the the card with habits and consumption
    $("#moveToConsHabits").click(() => {

        // First getting the associated information

        
        user.gender = $('input[name=gender]:checked').val(); // The gender
        var age = $("#age").val(); // Age
        if (age < 16)
            alert("Minimum age is 16 years old."); // If less than 16, it won't move
        else {
            user.age = age;
            user.height = $("#height").val(); // The height of the user
            user.nationality = $("#nationality").val(); // The nationality

            // Getting all the selected languages to store on the array of languages
            $("select option:selected").each(function () {
                user.languages.push($( this ).text()); 
            });

        $("#secondPersonalInfo").hide();
        $("#consHabits").show();
        }
        
    });


   


    // +++++++++++ Consumption and Habits


     // Returning to second Personal information
     $("#backToSecondPersonal").click(() => {
        $("#consHabits").hide();
        $("#secondPersonalInfo").show();        
    });


    // Moving to the card with other aspects
    $("#mTfirstOtherAscpects").click(() => {

        // Getting the information about the user habits
        user.nutrition = $('input[name=nutrition]:checked').val();
        user.smoking = $('input[name=smoking]:checked').val();
        user.drinking = $('input[name=drinking]:checked').val();
        user.drugs = $('input[name=drugs]:checked').val();

        $("#consHabits").hide();
        $("#firstOtherAscpects").show();
    });


    // +++++++++++ Other Aspects

    // Returning to the card with consumption and Habits
    $("#backToConsHabits").click(() => {

        $("#firstOtherAscpects").hide();
        $("#consHabits").show();
    });


    // Moving to the second card of other aspects
    $("#mTSecondOtherAscpects").click(() => {

        // Getting the information about cleaning and animals
        user.tidiness = $('input[name=tidiness]:checked').val();
        user.animals = $('input[name=animals]:checked').val();

        $("#firstOtherAscpects").hide();
        $("#secondOtherAscpects").show();
    });


    // +++++++++++ More Other Aspects

    // Returning to first card of other aspects
    $("#bTFirstOtherAscpects").click(() => {
        $("#secondOtherAscpects").hide();
        $("#firstOtherAscpects").show();        
    });

    // Moving to the card with Additional information
    $("#moveToAdditionalInfo").click(() => {


        // Getting the information about the working status and social behavior
        user.workStatus = $('input[name=workStatus]:checked').val();
        user.behavior = $('input[name=socialBehavior]:checked').val();

        $("#secondOtherAscpects").hide();
        $("#additionalInfo").show();

    });
    

    // +++++++++++ Additional information
    


});