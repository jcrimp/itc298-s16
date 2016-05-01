var express = require('express'); 
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static('./public'));
app.use(require('body-parser').urlencoded({ extended: true }));
var html_dir = './public/';
var albums = require('./lib/albums.js');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/*app.get('/', function(req, res) {
    res.sendfile(html_dir + 'home.html');
});*/

app.get('/', function(req, res){
  var listAlbums = albums.getAllAlbums();
  
  var names = [];
  listAlbums.forEach(function(album){
    names.push(album.name);
  });
  res.render('home', {albums:listAlbums});
});

app.get('/album/:myAlbum', function(req, res){
  var item = req.params.myAlbum;
  //console.log(item);
  var foundItem = albums.getSingleAlbum(item);
  //console.log(foundItem);
  res.render('detail', {foundItem});
});

app.get('/about', function(req, res){
  res.render('about');
});

app.post('/search', function(req, res){
  //var searchResults = albums.findMatchingAlbums(req.body.searchAlbumName);
  //res.send(searchResults);
  var itemToSearch = req.body.searchAlbumName;
  res.locals.search = req.body.searchAlbumName;
  var foundAlbum = albums.findMatchingAlbums(itemToSearch);
  console.log(foundAlbum);
  res.render('search', {foundAlbum});
});

app.post('/add', function(req, res){

  var addResults = albums.addAlbum(req.body.addAlbumName, req.body.addArtist, req.body.addRelease, req.body.addTracks, req.body.addInStock);
  res.send(addResults);
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