var mongoose = require('mongoose');
var mongoUri =
  process.env.MONGODB_URI ||
  //'mongodb://heroku_3v470bmt:q9f0f9oi1hiv6tmkpt48h87f64@ds153735.mlab.com:53735/heroku_3v470bmt';
  'mongodb://localhost:27017/urlshortener';
mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on('error', function(){
  console.log('DB connection failed');
});

db.once('open', function(){
  console.log('Connected to ' + mongoUri);
});

var UrlSchema = mongoose.Schema({
  longurl: String,
  shorturl: String
});

var UrlModel= mongoose.model('Url', UrlSchema);

module.exports = UrlModel;
