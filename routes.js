module.exports = function(app){
    var Album = require('./models/album.js');
    
    app.get('/', function(req, res){
        //var listAlbums = albums.getAllAlbums();
        Album.find({}, function(err, albums){
            if(err) throw err;
            //console.log(albums.length);
            var context = {
                albums: albums.map(function(album){
                    return {
                        id: album._id, 
                        name: album.name,
                        artist: album.artist,
                        release: album.release,
                        tracksNum: album.tracksNum,
                        inStock: album.inStock,
                        slug: album.slug
                    }
                })
            };
            res.render('home', context);
        });
        
    });
    
    app.get('/about', function(req, res){
        res.render('about');
    });
    
    app.get('/album/:myAlbum', function(req, res){
        var item = req.params.myAlbum;
        
        Album.findOne({slug:item}, function(err, album){
            if(err) throw err;
            console.log(album);
            res.render('detail', {album});
        });
    });
    
    app.post('/search', function(req, res){
        res.locals.search = req.body.searchAlbumName;
        var searchSlug = req.body.searchAlbumName.toLowerCase().replace(" ", "-");
        Album.findOne({ slug: searchSlug }, function(err, album){
            if(err) throw err;
            //console.log(album);
            res.render('search', {album});
        });
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