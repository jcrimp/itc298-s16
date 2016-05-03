var albums = [
  {name:"Prism Tats", artist:"Prism Tats", release: "2016-04-18", tracksNum: 9, inStock: true, slug:"prism-tats"},
  {name:"Revolver", artist:"The Beatles", release:"1966-08-05", tracksNum: 12, inStock: false, slug:"revolver"},
  {name:"London Calling", artist:"The Clash", release:"1979-12-14", tracksNum: 10, inStock: true, slug:"london-calling"},
  {name:"Discovery", artist:"Daft Punk", release:"2001-02-26", tracksNum: 13, inStock: true, slug:"discovery"}, 
  /*{id:4, name:'Discovery', artist:'Fake Artist', release:'2101-07-22', tracksNum: 2, inStock: false}*/
];

exports.getAllAlbums = function(){
  return albums;
};

exports.getSingleAlbum = function(albumToFind){
  return albums.find(function(album){
     return album.slug === albumToFind;
  });
};

exports.findMatchingAlbums = function(searchAlbum){
    var searchName = searchAlbum.toLowerCase();
    return albums.find(function(item){
        var itemName = item.name.toLowerCase();
        return itemName === searchName;
    });
};

exports.deleteAlbum = function(albumToDelete){
  var deleteVerification = '';
  var nameToDelete = albumToDelete.toLowerCase();
  for(var i = 0; i < albums.length; i++){
    var itemName = albums[i].name.toLowerCase();
    if(itemName === nameToDelete){
      albums.splice(i,1);
      var newList = listAllAlbums();
      deleteVerification = '<h1>Deleted '+ albumToDelete +'</h1>' + newList;
    }
    else{
      deleteVerification = '<h1>Unable to delete ' + albumToDelete + '</h1>';
    }
  }
  return deleteVerification;
};

exports.addAlbum = function(objToAdd){
  var searchName = objToAdd.addAlbumName.toLowerCase();
  var slugToAdd = searchName.replace(" ", "-");
  var found = albums.find(function(item){
    var itemName = item.name.toLowerCase();
    return itemName === searchName;
  });
  if(found){
    //album already in array
    return found;
  }
  else{
    //album not in array, go ahead and add it new
    var obj = {
      name: objToAdd.addAlbumName, 
      artist: objToAdd.addArtist, 
      release: objToAdd.addRelease, 
      tracksNum: objToAdd.addTracks, 
      inStock: objToAdd.addInStock, 
      slug:slugToAdd
    };
    //push the new album to the albums array
    albums.push(obj);
    return obj;
    }
};

/*exports.addAlbum = function(albumToAdd, artistToAdd, releaseToAdd, tracksToAdd, inStockToAdd){
  var addVerification = '';
  var inStockStatus = false;
  //first, check if album to add is already in the albums array
  var found = albums.find(function(album){
    return album.name === albumToAdd;
  });
  if(found){
    //album already in array
    found.artist = artistToAdd;
    found.release = releaseToAdd;
    found.tracksNum = tracksToAdd;
    found.inStock = inStockToAdd;
      var newList = listAllAlbums();
      addVerification = '<h1>' + albumToAdd + ' Updated!</h1>' + newList;
    
  }
  else{
    //album not already in array, assemble the album object to add
    if(inStockToAdd == 'true'){
      inStockStatus = true;
    }
    var obj = {name: albumToAdd, artist: artistToAdd, release: releaseToAdd, tracksNum: tracksToAdd, inStock: inStockStatus};
    //push the new album to the albums array
    albums.push(obj);
    var newList = listAllAlbums();
    addVerification = '<h1>' + albumToAdd + ' added successfully</h1>' + newList;
  }
  return addVerification;
};*/

/*exports.updateAlbum = function(albumToUpdate, artistToUpdate, releaseToUpdate, tracksToUpdate, inStockToUpdate){
  var updateVerification = '';
  //verify album name is already in array
  var found = albums.find(function(album){
    return album.name == albumToUpdate;
  });
  //if album is in array, change values of other fields
  if(found){
    //found = {name:albumToUpdate, artist:artistToUpdate, release:releaseToUpdate, tracksNum:tracksToUpdate, inStock: inStockToUpdate};
    found.artist = artistToUpdate;
    found.release = releaseToUpdate;
    found.tracksNum = tracksToUpdate;
    found.inStock = inStockToUpdate;
      var newList = listAllAlbums();
      updateVerification = '<h1>' + albumToUpdate + ' Updated!</h1>' + newList;
  }
  else{
  //album not in array, show error message
    updateVerification = '<h1>Album Not Found - Unable to update '+ albumToUpdate +'</h1>';
  }
  
  return updateVerification;
};*/