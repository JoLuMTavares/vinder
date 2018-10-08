$(document).ready(function() {
    if (window.location.href.indexOf("?activate=") > -1)
        activateUser(window.location.href);
    console.log('ready');
    let loggedIn = localStorage.getItem('loggedIn');
    if(loggedIn && loggedIn == 1) {
        buildApp();
    }
    else {
        buildAuth();
    }
});

// This is the function that sends the email to the user (activation process)
/* COMMENTED BECAUSE IT'S NOT POSSIBLE TO USE THE MODULE NODEMAILER HERE
function activationEmail(email, ACTIVATIONCODE) {
    sendMail(email, "no-reply. Account activation", `
        Thanks for your registration. 
        
        Please verify your account by clicking on
        the following link: http://localhost:3000/?activate=${ACTIVATIONCODE}

        Please, do not reply to this email.

        If you didn't ask for this email, we appologize for the inconvinience.

        With best regards,

        The Too Late Site
    `);
}

*/

function activateUser(url) {
    // console.log(url);
    let activCodeArr = new String(url).split("=");

    let activCode = "/activate?code=" + activCodeArr[1];

    console.log(activCode);


    $.ajax({
        url: activCode,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        // data: JSON.stringify(userData),
        success: function(data) {
            console.log('success ' + data);

            if(data.error == 0) {
                localStorage.setItem('loggedIn', 1);
                alert("Congratulations. Your account has been successfully created.");
                buildApp();
            }
        },
        error: function(err) {
            console.log('error ' + err);
        }
    });
    
}

function buildApp() {
    $('body').empty();
    $('body').append(`
        <div id="content" class="container">
        <nav class="nav">
            <a id="link-newlaty" class="nav-link active" href="#">Add Laty</a>
            <a id="link-history" class="nav-link" href="#">Show all Laties</a>
            <a id="link-logout" class="nav-link" href="#">Logout</a>
        </nav>
        </div>

        <div id="content" class="container">
        </div>
    `);

    $('#link-newlaty').on('click', () => {
        // show the add laty form
        $('#form-add').show();
        $('#table-history').hide();
    });

    $('#link-history').on('click', () => {
        // show the history
        $('#form-add').hide();
        $('#table-history').show();

        loadHistory();
    });
    
    $('#link-logout').on('click', () => {
        $.ajax({
            url: '/logout',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                console.log('success');
                localStorage.setItem('loggedIn', 0);
                buildAuth();
            },
            error: function(err) {
                console.log('error ' + err);
            }
        });
    });
    
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    
    let yyyy = now.getFullYear();
    if(dd < 10) {
        dd='0'+dd;
    }
    if(mm < 10) {
        mm='0'+mm;
    }

    let strNow = dd + '/' + mm + '/' + yyyy;
    let strTime = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes(); 

    $('#content').append(`
        <form id="form-add">
            <div class="row" style="margin-top: 150px">
                <div class="col-3">
                <input type="text" class="form-control" id="input-name" placeholder="Firstname">
                </div>

                <div class="col-3">
                <input type="text" class="form-control" id="input-date" value="${strNow}">
                </div>            

                <div class="col-3">
                <input type="text" class="form-control" id="input-time" value="${strTime}">
                </div>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 15px">Add New Laty</button>

            <div class="alert alert-success" style="display: none; margin-top: 10px"><strong>Success</strong> New Laty was added</div>
        </form>     
    `);

    $('#form-add').submit((e) => {
        e.preventDefault();

        let newLaty = {
            name: $('#input-name').val(),
            date: $('#input-date').val(),
            time: $('#input-time').val()
        };

        $.ajax({
            url: '/laties',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(newLaty),
            success: function(data) {
                console.log('success: ' + data);

                $('.alert-success').show().delay(2000).fadeOut('slow');
                $('#input-name').val('');
                $('#input-date').val('');
                $('#input-time').val('');
            },
            error: function(err) {
                console.log('error ' + err);
            }
        })
    });

    $('#content').append(`
        <table id="table-history" class="table" style="display: none; margin-top: 100px">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `);

    loadHistory();

    $('tbody').on('click', '.btn-delete-laty', (e) => {
        let row = $(e.target).parent().parent();
        let dataId = row.attr('data-id');

        $.ajax({
            url: '/laties/' + dataId,
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                row.remove();
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
}

function loadHistory() {
    $.ajax({
        url: '/laties',
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {

            $('.table tbody').empty();
            for(let i=0; i<data.length; i++) {
                let start = moment.duration('09:15', 'HH:mm');
                let end = moment.duration(data[i].time, 'HH:mm');
                let diff = end.subtract(start);
    
                let tooLate = diff.hours() + ':' + diff.minutes();
    
                $('.table tbody').append(`
                    <tr data-id="${data[i]._id}">
                        <td>${data[i].name}</td>
                        <td>${data[i].date}</td>
                        <td>${data[i].time} (${tooLate})</td>
                        <td><button type="button" class="btn btn-primary btn-delete-laty">Delete</button></td>
                    </tr>
                `)
            }
        },
        error: function(err) {
            console.log('error getting the toolate comers: ' + err);
        }
    });
}

function buildAuth() {
    $('body').empty();
    $('body').append(`
        <div id="content" class="container">
            <h1><b>Laty App</b></h1>
            <div class="row">            
                <div class="col-md-6">
                    
                    <div style="margin-top: 100px">
                        <h3>Login</h3>
                        <form id="form-login">
                            <div class="form-group">
                            <label for="username">Username</label>
                            <input style="max-width: 350px" class="form-control" id="username" placeholder="Enter Username or email">
                            </div>
                            <div class="form-group">
                            <label for="username">Username</label>
                            <input style="max-width: 350px" type="password"  class="form-control" id="password" placeholder="Password">                        
                            </div>               
                            <button type="submit" class="btn btn-primary">Login</button>         
                        </form>
                    </div>
                </div>
                <div class="col-md-6">
                    
                    <div style="margin-top: 100px">
                        <h3>Register</h3>
                        <form id="form-register">
                            <div class="form-group">
                            <label for="email">Email</label>
                            <input style="max-width: 350px" type="email" class="form-control" id="email" placeholder="Enter email address">
                            </div>
                            <div class="form-group">
                            <label for="password">Password</label>
                            <input style="max-width: 350px" type="password"  class="form-control" id="regPassword" placeholder="Enter password">                        
                            </div>   
                            <div class="form-group">
                            <label for="password">Repeat Password</label>
                            <input style="max-width: 350px" type="password"  class="form-control" id="repRegPassword" placeholder="Repeat your written password">                        
                            </div>              
                            <input type="submit" id="f-register" class="btn btn-primary" value="Register"></input>         
                        </form>
                    </div>
                </div>
            </div>            
        </div>    
    `);

    $("#form-register").submit((e) => {
        e.preventDefault();

        let now = new Date();

        let password = $("#regPassword").val();
        let secndPassword = $("#repRegPassword").val();

        if (password !== secndPassword) {
            alert("The passwords don't match! Please correct this.");
            return;
        }

        let userData = {
            username    : $("#email").val(),
            password    : password,
            registerDate : now
        }

        $.ajax({
            url: '/register',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(userData),
            success: function(data) {
                console.log('success ' + data);

                if (data.error == 1) {
                    alert("There is already an existent user with the inserted email. Please make a login to access your account.");
                    return;
                }
                if(data.error == 0) {
                    // activationEmail(data.email, data.activCode);
                    alert(`Thank you for your registration. An email was sent to your address. 
                           Please check your inbox in order to complete your account activation.`);
                }
            },
            error: function(err) {
                console.log('error ' + err);
            }
        });

    });

    $('#form-login').submit((e) => {
        e.preventDefault();

        let userData = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: '/login',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(userData),
            success: function(data) {
                console.log('success ' + data);

                if(data.error == 0) {
                    localStorage.setItem('loggedIn', 1);
                    buildApp();
                }
            },
            error: function(err) {
                console.log('error ' + err);
            }
        });
    });
}