function mimetype(filename) {
  return (/html$/i.test(filename) && "text/html")      ||
         (/css$/i.test(filename) &&  "text/css") ||
         (/jp.?g$/i.test(filename) && "image/jpeg")     ||
         (/gif$/i.test(filename) && "image/gif")       ||
         (/png$/i.test(filename) && "image/png")       ||
         (/js$/i.test(filename) && "application/javascript")     ||
         "text/plain"; 
}

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888,
    www_root = process.cwd() + "/" + ( process.argv[3] || "" );

console.log(process.cwd());
 
http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = www_root + uri;
  console.log(filename);
  
  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end(null);
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end(null);
        return;
      }
 
      response.writeHead(200, {"Content-Type": mimetype(filename)});
      response.write(file);
      response.end(null);
    });
  });
}).listen(parseInt(port, 10));
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");