var express = require('express'); 

var app = express();

app.use(express.static('./public'));
app.use(require('body-parser').urlencoded({ extended: true }));
var html_dir = './public/';

var albums = [
  {id:0, name:'Prism Tats', artist:'Prism Tats', release:'2016'},
  {id:1, name:'Revolver', artist:'The Beatles', release:'1966'},
  {id:2, name:'London Calling', artist:'The Clash', release:'1979'},
  {id:3, name:'Discovery', artist:'Daft Punk', release:'2001'}, 
  {id:4, name:'Discovery', artist:'Fake Artist', release:'Never'}
];

app.get('/', function(req, res) {
    res.sendfile(html_dir + 'home.html');
});

app.get('/about', function(req, res) {
    res.sendfile(html_dir + 'about.html');
});

app.post('/search', function(req, res){
  var album_name = req.body.albumname.toLowerCase();
  //var matches = [];
  var result_message = '';
  var headline = '<h1>Searching for '+ req.body.albumname +'</h1>';

  
  function matchingAlbum(item){
    var item_name = item.name.toLowerCase();
    return item_name === album_name;
  }
  
  var found = albums.filter(matchingAlbum);
  
  if(found.length > 0){
    found.forEach(function(foundItem){
        result_message += '<p><strong>Album Name:</strong> ' + foundItem.name + '</p>' 
    + '<p><strong>Artist:</strong> ' + foundItem.artist + '</p>'
    + '<p><strong>Release Year:</strong> ' + foundItem.release + '</p>' + '<br />';
    });
  }
  else{
    result_message = 'No results';
  }
  res.send(headline + result_message);

  /*albums.forEach(function(arrayItem){
    var match_name = arrayItem.name.toLowerCase();
    if(match_name === album_name){
      matches.push(arrayItem);
      console.log(match_name);
    }
  });
  
  if(matches.length > 0){
    matches.forEach(function(matchItem){
      result_message += '<p><strong>Album Name:</strong> ' + matchItem.name + '</p>' 
    + '<p><strong>Artist:</strong> ' + matchItem.artist + '</p>'
    + '<p><strong>Release Year:</strong> ' + matchItem.release + '</p>' + '<br />';
    });
  }
  else{
    result_message = '<p>No results found</p>';
  }

  res.send('<h1>Searching for ' + album_name + '</h1>' + result_message);*/
  
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