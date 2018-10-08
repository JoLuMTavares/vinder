const express = require('express');
const fileUpload = require('express-fileupload');
const randomstring = require('randomstring');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

var con = mysql.createConnection({
  host: 'localhost',
	user: 'root',
	password: 'foobar',
	database: 'vinder'
});

app.use(bodyParser());
app.use(cookieParser());
app.use(session({
		secret: 'mySecretKey',
		resave: true, // 
		saveUnitialized: true
}));

// default options
app.use(fileUpload());
app.use('/', express.static(__dirname + '/public'));

function auth(req, res, next) {
	if(req.session && req.session.user) {
			return next();
	}
	else {
			return res.sendStatus(401);
	}
}

app.post('/login', function(req, res) {
	if(!req.body.username) {
			res.send({ error: 'username required' });
  }
  
  con.query('select * from users where username = ?', [req.body.username],
   function(err, rows) {
		if(err) {
      return res.send( {error: err} );
    }

    if(rows.length === 0) {
      return res.send( {error: 'user not found'} );
    }

    req.session.user = rows[0].username;
    req.session.swiped = [];
    res.send({ error: 0 });
    console.log(JSON.stringify(req.session));
		console.log( rows );
	});
});

app.post('/signup', function(req, res) {
  if(!req.body.username || !req.body.profiletext) {
    return res.send({error: 'username and profiletext required'});
  }

  con.query('insert into users (username, profiletext) values (?, ?)', 
  [ req.body.username, req.body.profiletext ],
  function(err, rows) {
    if(err) {
      return res.send( {error: err} );
    }

    req.session.user = req.body.username;
    req.session.swiped = [];
    return res.send({ error: 0 });
  });
});

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.send({ error: 0 });
});

app.post('/like', function(req, res) {
  if(!req.body.userto) {
      return res.send({ error: 'userto is required' });
  } 

    // second, does a match already exist
    con.query('select * from likes where userfrom = ? and userto = ?', 
    [req.session.user, req.body.userto],
     function(err, rows) {
      if(err) {
        return res.send( {error: err} );
      }    

      // only insert another like if no match exists
      if(rows.length === 0) {
        // second, add the like
        con.query('insert into likes (userfrom, userto) values (?, ?)', 
        [req.session.user, req.body.userto],
        function(err, rows) {
          if(err) {
            return res.send( {error: err} );
          }

          req.session.user = rows[0].username;
          req.session.swiped.push(req.body.userto);
          
          res.send({ error: 0 });
          console.log(JSON.stringify(req.session));
          console.log( rows );
        });  
      }
      else {
        return res.send({ error: 0, match: { userfrom: req.session.user, userto: req.body.userto}});
      }
    });

  // insert sql match for 
});

app.get('/nextuser', function(req, res) {
  con.query('select * from users where username != ?', [req.session.user],
   function(err, rows) {
    if(err) {
      return res.send( {error: err} );
    }    

    // improve \\
    if(rows.length > 0) {
      let randomUser = Math.floor(Math.random() * rows.length - 1);
      return res.send(rows[randomUser]);
    }
    else {
      return res.send({error: 'no users left'});
    }
  });
});

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let uservideo = req.files.uservideo;
 
  // Use the mv() method to place the file somewhere on your server
  let filename = randomstring.generate(20);
  uservideo.mv('/home/jan/Desktop/vinder/fileupload/public/files/'+filename+'.mov' , function(err) {
    if (err)
      return res.status(500).send(err);

      console.log(req.files.uservideo);
      if(new String(req.files.uservideo).endsWith('.mov')) {
        exec('ffmpeg -i '+__dirname+'/public/files/'+filename+'.mov -vcodec copy -acodec copy '+__dirname+'/public/files/'+filename+'.mp4', (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            return res.status(500).send(err);
          }
        
          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          res.redirect('http://localhost:8000/?p=discover');
        });
      }
      else {
        res.redirect('http://localhost:8000/?p=discover');
      }

      con.query('update users set videourl = ? where username = ?', 
      ['http://localhost:8000/files/'+filename+'.mp4', ],
      function(err, rows) {
        if(err) {
          return res.send( {error: err} );
        }
      });      
  });
});


app.listen(8000);