var express = require('express')
var app = express();
var mongo = require('mongodb').MongoClient;

var router = require('./routes/router.js');
app.use('/', router);

// mongo.connect('mongodb://localhost:27017/urlshortener', function(err, db){
//   if(err) throw err;
//   db.collection('urls').find(toArray(function(err, result){
//     if(err) throw err;
//     console.log(result);
//   }));
// });

//app.use(port, process.env.PORT || 3000);
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port '+ port);
})
