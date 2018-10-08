const mysql = require("mysql");

let con = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "halloworld"
});

/*
con.query("select * from users", function (err,  rows) {
    if(err) 
        throw err;

    console.log( rows );
    console.log ( rows[2].username );
});

*/

/*
con.query("select * from users where username = ?", ["Max"], 
    function (err,  rows) {
        if(err) 
            throw err;

    console.log( rows );
    console.log ( rows[2].username );
});
*

con.query("update users set username = ? where username = ?", ["Ichigo","Lars"], 
    function (err,  rows) {
        if(err) 
            throw err;

    console.log( rows );
    // console.log ( rows[2].username );
});

*

con.query("insert into users (username) values (?)", ["Michael"], 
    function (err,  rows) {
        if(err) 
            throw err;

    console.log( rows.insertId );
    // console.log ( rows[2].username );
});

*/

con.query("delete from users where username = ?", ["Drok"], 
    function (err,  rows) {
        if(err) 
            throw err;

    console.log( rows );
    // console.log ( rows[2].username );
});
