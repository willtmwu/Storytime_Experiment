//Dependencies
var
http = require('http'),
path = require('path'),
fs = require('fs');

extensions = {
  ".html" : "text/html",
  ".css" : "text/css",
  ".js" : "application/javascript",
  ".png" : "image/png",
  ".gif" : "image/gif",
  ".jpg" : "image/jpeg"
};

function getFile(filePath,res,page404, mimeType){
  fs.exists(filePath, function(exists){
    if(exists){
      fs.readFile(filePath,function(err,contents){
        if(!err){
          res.writeHead(200,{
						"Content-type" : mimeType,
						"Content-Length" : contents.length
					});
          res.end(contents);
        } else {
          console.dir(err);
        };
      });
    } else {
      fs.readFile(page404,function(err,contents){
        if(!err){
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(contents);
        } else {
          console.dir(err);
        };
      });
    };
  });
};

//Handler for the request and response object
function requestHandler(req, res){
  var
  fileName = path.basename(req.url) || 'index.html',
  ext = path.extname(fileName),
  page404 = __dirname + '/public/webpages/page_404.html';

  //find path to folder
  if(!extensions[ext]){
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
  } else {
    var folder = '/webpages';
    if(ext == '.js'){
      folder = '/scripts';
    } else if (ext == '.css') {
      folder = '/css';
    } else if ( (ext=='.png') || (ext=='.jpg') || (ext=='.gif') ){
      folder = '/img';
    }

    var localFolder = __dirname + '/public' + folder + '/';
    getFile( (localFolder + fileName), res, page404, extensions[ext]);
  }
};

//localhost 127.0.0.1
http.createServer(requestHandler).listen(8124, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8124/');
