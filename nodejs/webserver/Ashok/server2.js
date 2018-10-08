var http = require("http"); // Import node.js core module

var server = http.createServer(function (req, res) { // 2. Create web server

    // Handle incomming requests here...

    // Check the URL of the current request
    if (req.url == "/") {
        
        // Set response header
        res.writeHead(200, {"Content-Type" : "text/html"});

        // Set response content
        res.write("<html><body><p>This is the home page</p></body></html>");

        res.end();

    }
    else if (req.url == "/student") {

        // Set response header
        res.writeHead(200, {"Content-Type" : "text/html"});

        res.write("<html><body><p>This is student page.</p></body></html>");
        res.end();
    }

    else if (req.url == "/admin") {

        // Set response header
        res.writeHead(200, {"Content-Type" : "text/html"});

        res.write("<html><body><p>This is administrator page.</p></body></html>");
        res.end();
    }

    else if (req.url == "/data") {

        // Set response header
        res.writeHead(200, {"Content-Type" : "application/json"});

        res.write(JSON.stringify({message:"Hello World"}));
        res.end();
    }
    else
        res.end("Invalid Request.");
    
});

server.listen(5000);
console.log("Node.js web server running at port 5000...");