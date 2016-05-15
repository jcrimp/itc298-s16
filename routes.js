module.exports = function(app){
    var albums = require('./lib/albums.js');
    
    //var Album = require('./models/album.js');
    
    app.get('/', function(req, res){
        var listAlbums = albums.getAllAlbums();
        res.render('home', {listAlbums});
    });
    
    app.get('/about', function(req, res){
        res.render('about');
    });
    
    app.get('/album/:myAlbum', function(req, res){
        var item = req.params.myAlbum;
        var foundItem = albums.getSingleAlbum(item);
        if(foundItem){
          res.render('detail', {foundItem});
          console.log(foundItem);
        }
        else{
          res.type('text/plain');
        res.status(404);
        res.send('404 - Page not found');
        }
        //res.render('detail', {foundItem});
    });
    
    app.post('/search', function(req, res){
        /*Album.find({name: req.body.searchAlbumName}, function(err, album){
            if(err) throw err;
            console.log(album);
        });*/
        res.locals.search = req.body.searchAlbumName;
        var foundAlbum = albums.findMatchingAlbums(req.body.searchAlbumName);
        res.render('search', {foundAlbum});
    });
    
    app.post('/add', function(req, res){
        /*var newAlbum = Album({
        name: 'Lemonade',
        artist: 'Beyonce',
        release: new Date('2016-04-43'),
        tracksNum: 13,
        inStock: true
        });
    
        newAlbum.save(function(err){
            if(err){
                throw err;
            }
            console.log('New album created!');
        });*/
        
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
        console.log(albumAdded);
        res.render('add', {albumAdded});
    });
    
    app.post('/update', function(req, res){
        var foundItem = albums.updateAlbum(req.body);
        if(foundItem){
          res.locals.updateSuccess = true;
        }
        res.render('detail', {foundItem});
    });
    
    app.post('/delete', function(req, res){
        //console.log(req.body.deleteAlbumName);
        res.locals.deletedAlbum = req.body.deleteAlbumName;
        res.locals.deleteSuccess = albums.deleteAlbum(req.body.deleteAlbumName);
        res.render('delete');
    });
    
    
    // API ROUTES
    app.get('/api/albums', function(req, res){
        var allAlbums = albums.getAllAlbums();
        if(allAlbums){
          res.json(allAlbums);
        }
        else{
          res.status(404).send('404 - No Data');
        }
    });
    
    app.get('/api/album/:anAlbum', function(req, res){
        var foundItem = albums.getSingleAlbum(req.params.anAlbum);
        if(foundItem){
          res.json(foundItem);
        }
        else{
          res.type('text/plain');
          res.status(404).send('404 - Page not found');
        }
    });

};