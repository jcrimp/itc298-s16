module.exports = function(app){
    var Album = require('./models/album.js');
    var html_dir = './public/';
    
    app.get('/', function(req, res){
        Album.find({}, function(err, albums){
            if(err) throw err;
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
        
        //res.render('a8home', {layout: false});
        //res.sendfile(html_dir + 'home.html');

    });
    
    app.get('/about', function(req, res){
        res.render('about');
    });
    
    app.get('/angular', function(req, res){
        res.sendfile(html_dir + 'angular.html');
    });
    
    app.get('/album/:myAlbum', function(req, res){
        var item = req.params.myAlbum;
        
        Album.findOne({slug:item}, function(err, album){
            if(err) throw err;
            if(album){
                console.log(album);
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
                    inStock: req.body.addInStock,
                    slug: albumNameToAdd.toLowerCase().replace(" ", "-")
                }).save(function(err, album){
                    if(err) throw err;
                    //console.log(album);
                    res.render('add', {album});
                });
            }
        })
    });
    
    app.post('/update', function(req, res){
        //check if body has id
        if(req.body.id){
            //if body has id, make sure addAlbumName doesn't already exist in a document other than the current one.
            var albumNameToAdd = req.body.addAlbumName.toString();
            var myPattern = new RegExp(albumNameToAdd, 'i');
            Album.findOne({_id: {$ne:req.body.id}, name: {$regex:myPattern}}, function(err, album){
                if(err) throw err;
                if(album){
                    //if it is already there, set alreadyExists to true, and render the template with the old album name
                    res.locals.alreadyExists = true;
                    Album.findOne({_id:req.body.id}, function(err, album){
                        if(err) throw err;
                        res.render('detail', {album});
                    }); 
                }
                else{
                //if addAlbumName doesn't already exist, set update success message to true, update the document with that id, and render detail page with the updated document.
                res.locals.updateSuccess = true;
                Album.findOne({_id:req.body.id}, function(err, album){
                    if(err) throw err;
                    album.name = req.body.addAlbumName; 
                    album.artist = req.body.addArtist;
                    album.release =  req.body.addRelease;
                    album.tracksNum = req.body.addTracks;
                    album.inStock = req.body.addInStock;
                    album.slug = albumNameToAdd.toLowerCase().replace(" ", "-");
                    album.save(function(err){
                        if(err) throw err;
                        console.log(album);
                        res.render('detail', {album});
                    });
                });
            }
        });
        }
        else{
            //if body doesn't have ID, you shouldn't have even gotten this far. 404 error.
            res.type('text/plain');
            res.status(404).send('404 - There was a problem updating the data');
        } 
    });
    
    app.post('/delete', function(req, res){
        Album.findById(req.body.deleteId, function(err, album){
            if(err) throw err;
            album.remove(function(err){
                if(err) throw err;
                res.locals.deleteSuccess = true;
                res.locals.deletedAlbum = album.name;
                res.render('delete');
            });
        });
    });
    
    
    // API ROUTES
    app.get('/api/albums', function(req, res){       
        Album.find({}, function(err, albums){
            if(err) throw err;
            if(albums){
                res.json(albums);
            }
            else{
                res.status(404).send('404 - No Data');
            }
        });
    });
    
    app.get('/api/album/:anAlbum', function(req, res){ 
        Album.findOne({slug:req.params.anAlbum}, function(err, album){
            if(err) throw err;
            if(album){
                res.json(album);
            }
            else{
                res.type('text/plain');
                res.status(404).send('404 - Page not found');
            }
        });
    });
    
    app.post('/api/update', function(req, res){
        //check if body has id
        console.log('Request: ' + req);
        console.log('Body: ' + req.body);
        console.log('ID: ' + req.body.id);
        if(req.body.id){
            //if body has id, make sure addAlbumName doesn't already exist in a document other than the current one.
            var albumNameToAdd = req.body.addAlbumName.toString();
            var myPattern = new RegExp(albumNameToAdd, 'i');
            Album.findOne({_id: {$ne:req.body.id}, name: {$regex:myPattern}}, function(err, album){
                if(err) throw err;
                if(album){
                    //if it is already there, set alreadyExists to true, and render the template with the old album name
                    res.locals.alreadyExists = true;
                    Album.findOne({_id:req.body.id}, function(err, album){
                        if(err) throw err;
                        res.json({"result": "alreadyExists"});
                    }); 
                }
                else{
                    //if addAlbumName doesn't already exist, set update success message to true, update the document with that id, and render detail page with the updated document.
                    Album.findOne({_id:req.body.id}, function(err, album){
                        if(err) throw err;
                        album.name = req.body.addAlbumName; 
                        album.artist = req.body.addArtist;
                        album.release =  req.body.addRelease;
                        album.tracksNum = req.body.addTracks;
                        album.inStock = req.body.addInStock;
                        album.slug = albumNameToAdd.toLowerCase().replace(" ", "-");
                        album.save(function(err){
                            if(err) throw err;
                            console.log(album);
                            res.json({"result": "updated", album});
                        });
                    });
                }
            });
        }
        else{
            //if body doesn't have ID, you shouldn't have even gotten this far. 404 error.
            res.type('text/plain');
            res.status(404).send('404 - There was a problem updating the data');
        } 
    });
    
    
    app.post('/api/delete', function(req, res){
        console.log(req.body.deleteID)
        Album.findById(req.body.deleteID, function(err, album){
            if(err) throw err;
            album.remove(function(err){
                if(err) throw err;
                //res.locals.deleteSuccess = true;
                //res.locals.deletedAlbum = album.name;
                res.json({"result": "deleted", album});
            });
        });
    });
};