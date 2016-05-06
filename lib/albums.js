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

exports.deleteAlbum = function(nameToDelete){
  var searchName = nameToDelete.toLowerCase();
  var found = albums.find(function(item){
    var itemName = item.name.toLowerCase();
    return itemName === searchName;
  });
  if(found){
    //album already in array, delete it
    var foundIndex = albums.indexOf(found);
    albums.splice(foundIndex, 1);
    return true;
  }
  else{
    return false;
  }
};

exports.addAlbum = function(objToAdd){
  var searchName = objToAdd.addAlbumName.toLowerCase();
  var slugToAdd = searchName.replace(" ", "-");
  var inStockToAdd = false;
  if(objToAdd.addInStock === 'true'){
    inStockToAdd = true;
  }
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
      inStock: inStockToAdd, 
      slug:slugToAdd
    };
    //push the new album to the albums array
    albums.push(obj);
    console.log(obj);
    return obj;
    }
};

exports.updateAlbum = function(updatesObj){
  var searchName = updatesObj.addAlbumName.toLowerCase();
  var slugToAdd = searchName.replace(" ", "-");
  var inStockToAdd = false;
  if(updatesObj.addInStock === 'true'){
    inStockToAdd = true;
  }
  var found = albums.find(function(item){
    var itemName = item.name.toLowerCase();
    return itemName === searchName;
  });
  if(found){
    //album already in array, update it
    //found.name = updatesObj.addAlbumName;
    found.artist = updatesObj.addArtist;
    found.release = updatesObj.addRelease;
    found.tracksNum = updatesObj.addTracks;
    found.inStock = inStockToAdd;
    found.slug = slugToAdd;
    return found;
  }
  else{
    //album not in array
    return false;
  }
};