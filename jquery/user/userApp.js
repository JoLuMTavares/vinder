var userComments = (function () {

    // Only returning the main four operations
    return {

        getUsers :  function () {
            // Clear the page so there's no duplicated information
            $("#users-list").empty();  

            $.ajax({
                url      : 'http://cileria.com:3050/users/',
                type     : 'GET',
                dataType : 'json',
                success  : function (response) {
                    // console.log('​getUsers -> response', response);
    
                    var table = $("<table>");
                    var header = $("<th>Name</th><th>Username</th><th>Email</th>");
    
                    table.append(header);
    
                    for (var i = 0; i < response.length; i++) {
                        var row = $("<tr>");
                        var dataInfo = $("<td>" + response[i].name + "</td><td>" + response[i].username + "</td><td>" + response[i].email + "</td>");
                        row.append(dataInfo);
                        table.append(row);
                    }
    
                    $("#users-list").append(table);

                    $("#users-list").show();
                    $("#comments-list").hide();
                    $("#main-user").hide();
                    $("#main-comment").hide();
                }
    
            });
        },

        // To get the list of comments
        getComments :   function () {

            // Clear the page so there's no duplicated information
            $("#comments-list").empty();    

            $.ajax({
                url      : 'http://cileria.com:3050/comments/',
                type     : 'GET',
                dataType : 'json',
                success  : function (response) {
                    console.log('getComments -> response', response);

                    var table = $("<table>");
                    var header = $("<th>Name</th><th>Email</th><th>Comment</th>");

                    table.append(header);

                    for (var i = 0; i < response.length; i++) {
                        var row = $("<tr>");
                        var dataInfo = $("<td>" + response[i].name + "</td><td>" + response[i].email + "</td><td>" + response[i].body + "</td>");
                        row.append(dataInfo);
                        table.append(row);
                    }

                    $("#comments-list").append(table);

                    $("#users-list").hide();
                    $("#comments-list").show();
                    $("#main-user").hide();
                    $("#main-comment").hide();
                }

            });
        },

        // To add a new user
        addUser :   function () {
            var name = $("#validationCustom01").val();
            console.log('​name', name);

            var username = $("#validationCustom02").val();

            var emailAddress = $("#validationCustomEmail").val();

            $.ajax({
                url         : 'http://cileria.com:3050/users/',
                type        : 'POST',
                dataType    : 'JSON',
                data        :  JSON.stringify( 
                    {
                        name        : name,
                        username    : username,
                        email       : emailAddress
                    }
                ),
                dataType    : 'JSON',
                contentType : 'application/json',
                success   : function (response) {
                    console.log('Response' + response);
                },
                error     : function (xhr, status, error) {
                    console.log(`
                        error   : ${error},
                        status  : ${status},
                        xhr     : ${JSON.stringify(xhr)}
                    `);
                }

            });
        },

        // To add a new comment
        addComment  :   function () {
            var name = $("#validationCustom04").val();
            console.log('​name', name);

            var emailAddress = $("#validationCustom05").val();

            var comment = $("#validationCustom06").val();

            $.ajax({
                url         : 'http://cileria.com:3050/comments/',
                type        : 'POST',
                dataType    : 'JSON',
                data        :  JSON.stringify( 
                    {
                        name        : name,
                        email       : emailAddress,
                        body        : comment
                        
                    }
                ),
                dataType    : 'JSON',
                contentType : 'application/json',
                success   : function (response) {
                    console.log('Response' + response);
                },
                error     : function (xhr, status, error) {
                    console.log(`
                        error   : ${error},
                        status  : ${status},
                        xhr     : ${JSON.stringify(xhr)}
                    `);
                }

            });
        }

    }
})();

var eventsListener = (function (userComm) {

    var showUsers = function () {
        userComm.getUsers();
    }

    var showComments = function () {
        userComm.getComments();
    }

    var showUserForm = function () {
        $("#users-list").hide();
        $("#comments-list").hide();
        $("#main-user").show();
        $("#main-comment").hide();
        $("#add-User-Form")[0].reset(); // Clear all fields when page is loaded

        // When the form is submitted
        $("#add-user-btn").click( () => {
            userComm.addUser();
            $("#add-Comm-Form")[0].reset(); // Clear all fields when page is loaded
        });
    }

    var showCommentForm = function () {
        $("#users-list").hide();
        $("#comments-list").hide();
        $("#main-user").hide();
        $("#main-comment").show();
        $("#add-Comm-Form")[0].reset(); // Clear all fields when page is loaded

        // When the form is submitted
        $("#submit-comm").click( () => {
            userComm.addComment();
            $("#add-Comm-Form")[0].reset(); // Clear all fields when page is loaded
        });
    }

    return {
        init :  function () {
            userComm.getUsers();

            $("#users").click( () => {
                showUsers();
            }); 
        
            $("#comments").click( () => {
                showComments();    
            });
        
        
            $("#add-user").click( () => {
                showUserForm();
            });
        
            $("#add-comment").click( () => {
                showCommentForm();
            });
        }
    }

})(userComments);

$(document).ready( function() {
    console.log('Document is loaded.');

    // Loading first the users
    eventsListener.init();
});