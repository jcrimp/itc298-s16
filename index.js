var express = require('express'); 
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static('./public'));
app.use(require('body-parser').urlencoded({ extended: true }));
var html_dir = './public/';
var albums = require('./lib/albums.js');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  var listAlbums = albums.getAllAlbums();
  res.render('home', {listAlbums});
});

app.get('/album/:myAlbum', function(req, res){
  var item = req.params.myAlbum;
  var foundItem = albums.getSingleAlbum(item);
  res.render('detail', {foundItem});
});

app.get('/about', function(req, res){
  res.render('about');
});

app.post('/search', function(req, res){
  res.locals.search = req.body.searchAlbumName;
  var foundAlbum = albums.findMatchingAlbums(req.body.searchAlbumName);
  res.render('search', {foundAlbum});
});

app.post('/add', function(req, res){
  //check if album is already in array
  var found = albums.findMatchingAlbums(req.body.addAlbumName);
  if(found){
  //if it is, set success check to false
  res.locals.success = false;
  }
  else{
  //if not, set success check to true
  res.locals.success = true;
  }
  res.locals.addname = req.body.addAlbumName;
  var albumAdded = albums.addAlbum(req.body);
  res.render('add', {albumAdded});
});

/*app.post('/update', function(req, res){
  var updateResults = albums.updateAlbum(req.body.updateAlbumName, req.body.updateArtist, req.body.updateRelease, req.body.updateTracks, req.body.updateInStock);
  res.send(updateResults);
});*/

app.post('/delete', function(req, res){
  var deleteResults = albums.deleteAlbum(req.body.addAlbumName);
  res.send(deleteResults);
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