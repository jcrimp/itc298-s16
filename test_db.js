exports.testDB = function(){
    var Album = require('./models/album.js');
    
    new Album({
        name: "Lemonade",
        artist: "Beyonce",
        release: new Date("2016-04-13"),
        tracksNum: 13,
        inStock: true,
        slug: "lemonade"
    }).save();
    
    new Album({
        name: "Prism Tats",
        artist: "Prism Tats",
        release: new Date('2016-04-18'),
        tracksNum: 9,
        inStock: true,
        slug: 'prism-tats'
    }).save();
    
    new Album({
        name: "Revolver",
        artist: "The Beatles",
        release: new Date('1966-08-05'),
        tracksNum: 12,
        inStock: false,
        slug: 'revolver'
    }).save();
    
    
    Album.find({}, function(err, items){
        if(err) return next(err);
        console.log(items.length);
        items.forEach(function(item){
            console.log(item);
        });
        
    });
};