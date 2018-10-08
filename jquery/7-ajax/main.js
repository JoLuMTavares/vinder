
$(document).ready( function() {
    console.log('Document is loaded.');


    // 1. use the $.ajax method, to load 
    //    the data.json and load its contents
    //    into the table #tbl1 (not the getJSON here)
    $('.getdatasuccess').click(function () {
        
        $.ajax({
            url      : 'data.json',
            type     : 'GET',
            dataType : 'json',
            success  : function (response) {
                var rows = $('#tbl1 tr.row');
                for (let i = 0; i < rows.length; i++) {
                    $(rows[i]).children().eq(0).html(response[i].name);
                    $(rows[i]).children().eq(1).html(response[i].subject);
                }
            }
        });
    });


    // 2. create an ajax requests that 
    //    loads a file that DOES NOT exist
    //    and print out the status code in the "error" function
    //    of the ajax object.
    $('.getdatafail').click(function () {
        $.ajax({

            url      : 'data.json',
            type     : 'GET',
            sucess   : function (response) {
                console.log(`Will not be called.`)
            },
            error    : function (xhr, status, error) {
                console.log(`
                    error   : ${error},
                    status  : ${status},
                    xhr     : ${JSON.stringify(xhr)}
                `);
            }
           
        });    
    });
    

    // 3. create an $.get request that loads
    //    the "data.html" file into the #htmldata
    //    div
    $('.getdata').click(function () {
       $.get('data.html', function (response) {
          $('#htmldata').append(response); 
       }); 
    });

    // 4. load the script "data.js" using the
    //    $.getScript function
    $('.getscript').click(function () {
        $.getScript('data.js', function (response) {
            console.log(response);     
        });
    });

    $('.getjson').click(function () {
       
        $.getJSON('data.txt', function (response) {
            var rows = $('#tbl2 tr.row');
            for (var i = 0; i < rows.length; i++) {
                $(rows[i]).children().eq(0).html(response[i].name);
                $(rows[i]).children().eq(1).html(response[i].subject);
            }
        });

    });

    // Same as in 1., load the data.txt again using the $.getJSON function 
    // and load the contents into the table #tbl2

    // 5. Load all users from http://35.156.88.18:3050/users

    $.ajax({

        url      : 'http://35.156.88.18:3050/users',
        type     : 'GET',
        dataType : 'JSON',
        success   : function (response) {
            console.log(`Will not be called.`)
        }
       
    });    

    // 6. Create a new user on http://35.156.88.18:3050/users

    /*
    $.ajax({

        url         : 'http://35.156.88.18:3050/users',
        type        : 'GET',
        dataType    : 'JSON',
        contentType : 'application/json',
        success   : function (response) {
            var rows = $('#tbl1 tr.row');
            for (var i = 0; i < rows.length; i++) {
                $()
            }
            console.log(`Will not be called.`)
        }
       
    });   

    */

   $.ajax({

        url         : 'http://35.156.88.18:3050/users',
        type        : 'POST',
        dataType    : 'JSON',
        data        :  JSON.stringify( 
            {
                name        : 'João Luís M. Tavares',
                username    : 'V12-1200hp-driver',
                email       : 'joaoluism.tavares@gmail.com'
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
    
});

