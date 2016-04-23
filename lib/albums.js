var albums = [
  {id:0, name:'Prism Tats', artist:'Prism Tats', release:'2016'},
  {id:1, name:'Revolver', artist:'The Beatles', release:'1966'},
  {id:2, name:'London Calling', artist:'The Clash', release:'1979'},
  {id:3, name:'Discovery', artist:'Daft Punk', release:'2001'}, 
  {id:4, name:'Discovery', artist:'Fake Artist', release:'Never'}
];



exports.findMatchingAlbums = function(searchAlbum){
    var resultMessage = '<h1>Searching for '+ searchAlbum +'</h1>';
    //var headline = '';
    var searchName = searchAlbum.toLowerCase();
    var found = albums.filter(function(item){
        var itemName = item.name.toLowerCase();
        return itemName === searchName;
    });
    
    if(found.length > 0){
      found.forEach(function(foundItem){
          resultMessage += '<p><strong>Album Name:</strong> ' + foundItem.name + '</p>' 
      + '<p><strong>Artist:</strong> ' + foundItem.artist + '</p>'
      + '<p><strong>Release Year:</strong> ' + foundItem.release + '</p>' + '<br />';
      });
    }
    else{
      resultMessage += '<p>No results</p>';
    }
    return resultMessage;
};