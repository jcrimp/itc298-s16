var express = require('express'); 

var app = express();

app.use(express.static('./public'));
app.use(require('body-parser').urlencoded({ extended: true }));
var html_dir = './public/';
var albums = require('./lib/albums.js');

app.get('/', function(req, res) {
    res.sendfile(html_dir + 'home.html');
});

app.get('/about', function(req, res) {
    res.sendfile(html_dir + 'about.html');
});

app.post('/search', function(req, res){
  var results = albums.findMatchingAlbums(req.body.albumname);
  res.send(results);
});

app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page not found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
  console.log('The server is running ' + app.get('port') + '; Press Ctrl-C to terminate.');
});