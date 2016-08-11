var mongoose = require('mongoose');
var mongoUri =
  process.env.MONGOLAB_URI ||
  'mongodb://localhost/urlshortener';
mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on('error', function(){
  console.log('DB connection failed');
});

db.once('open', function(){
  console.log('DB connected');
});

var UrlSchema = mongoose.Schema({
  longurl: String,
  shorturl: String
});

var UrlModel= mongoose.model('Url', UrlSchema);

module.exports = UrlModel;
