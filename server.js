//Dependencies
var
http = require('http'),
path = require('path'),
fs = require('fs');

function getFile(filePath,res,page404){
  fs.exists(filePath,function(exists){
    if(exists){
      fs.readFile(filePath,function(err,contents){
        if(!err){
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

function requestHandler(req, res){
  var
  content = '',
  fileName = path.basename(req.url) || 'index.html',
  localFolder = __dirname + '/',
  page404 = localFolder + 'page_404.html';

  getFile( (localFolder + fileName), res, page404);
};

http.createServer(requestHandler).listen(8124, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8124/');
