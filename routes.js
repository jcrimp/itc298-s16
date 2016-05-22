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
            if(album){
                //console.log(album);
                //console.log(album.release.getDate());
                res.render('detail', {album});
            }
            else{
                res.status(404).render('404');
            }
        });
    });
    
    app.post('/search', function(req, res){
        var searchName = req.body.searchAlbumName;
        res.locals.search = searchName;
        var myPattern = new RegExp(searchName, 'i');
        Album.findOne({name:{$regex:myPattern}}, function(err, album){
            if(err) throw err;
            console.log(album);
            res.render('search', {album});
        });
    });
    
    app.post('/add', function(req, res){       
        var albumNameToAdd = req.body.addAlbumName.toString();
        var myPattern = new RegExp(albumNameToAdd, 'i');
        //first, search for the album that's being added to see if it's already there
        Album.findOne({name: {$regex:myPattern}}, function(err, album){
            if(err) throw err;
            //if it is already there, set add success message to false, and render the template with the existing album name
            if(album){
                res.locals.success = false;
                res.render('add', {album});
            }
            //if it's not already there, set add success message to true, add the new album, and render the 
            else{
                res.locals.success = true;
                var newAlbum = new Album({
                    name: req.body.addAlbumName, 
                    artist:req.body.addArtist,
                    release: req.body.addRelease,
                    tracksNum: req.body.addTracks,
                    slug: albumNameToAdd.toLowerCase().replace(" ", "-")
                }).save(function(err, album){
                    if(err) throw err;
                    console.log(album);
                    res.render('add', {album});
                });
            }
        })
    });
    
    app.post('/update', function(req, res){
//        var foundItem = albums.updateAlbum(req.body);
//        if(foundItem){
//          res.locals.updateSuccess = true;
//        }
//        res.render('detail', {foundItem});
        
        //check if body has id
        if(req.body.id){
            //if it does, set update success message to true, update the document with that id, and render detail page with the updated document.
            res.locals.updateSuccess = true;
            
        }
        else{
            
            //if it doesn't, set update success message to false, and render detail page again with found result for that id 
        }
        
        
        
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