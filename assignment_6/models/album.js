var mongoose = require('mongoose');
var creds = require('../credentials.js');
mongoose.connect(creds.getCredentials());

var albumSchema = mongoose.Schema({
    name: {type: String, required: true},
    artist: String,
    release: Date,
    tracksNum: Number,
    inStock: Boolean,
    slug: String
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;