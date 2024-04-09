var http = require('http');
var fs = require('fs');

const PORT = 8080;

http.createServer(function(request, response) {  
    let filePath;

    // Check the URL of the request
    if (request.url === '/profile') { 
        filePath = './profile.html';
    } else if (request.url === '/' || request.url === '/index') {
        filePath = './index.html';
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("404 Not Found");
        return;
    }

    // Read and serve the file content
    fs.readFile(filePath, function(err, content) {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.end("Error loading " + filePath);
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
        }
    });
}).listen(PORT);
