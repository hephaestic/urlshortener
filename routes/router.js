var express = require('express');
var router = express.Router();
var url = require('url');
var validator = require('valid-url');

router.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});
router.get('/', function(req, res){
  res.send('welcome');
  //show intro page with jade
});
router.get('/new/*', function(req, res){
  var longurl = url.parse(req.path.replace('/new/', ''));
  //res.send(longurl.hostname + ' -> ' + '[shortened url]');
  //verify valid url
  var validHttp = validator.isHttpUri(longurl.href);
  var validHttps = validator.isHttpsUri(longurl.href);
  console.log(validHttp);
  console.log(validHttps);
  console.log(validHttp || validHttps);
  if(validHttp || validHttps){
    //controller.addURL(){
      //generate short url
      //var shorturl = longurl.href + '1';
      //add to db

      //send json
    //}
    res.json({longurl: longurl.href, shorturl: '1'});
  }
  else{
    res.json({error: 'Invalid URL'});
  }
});
router.get('/:shorturl', function(req, res){
  var shorturl = req.params.shorturl;
  res.send(shorturl + ' -> ' + ' [original url]');
  //get db entry
  //if none, complain
  //else redirect
});

module.exports = router;
