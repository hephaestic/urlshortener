var express = require('express')
var app = express();
var mongo = require('mongodb').MongoClient;

var router = require('./routes/router.js');
app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port '+ port);
})
