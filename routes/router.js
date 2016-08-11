var router = require('express').Router();
var url = require('url');
var validator = require('valid-url');
var UrlController = require('../controllers/UrlController.js');

router.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

router.get('/', function(req, res){
  //res.send('welcome');
  //show intro page with jade
  UrlController.index(req, res);
});

router.get('/new/*', function(req, res){
  var longurl = url.parse(req.path.replace('/new/', ''));
  var validlongUrl =
    validator.isHttpUri(longurl.href) ||
    validator.isHttpsUri(longurl.href);
  if(validlongUrl){
    req.longurl = validlongUrl;
    var objAdded = UrlController.UrlCreate(req, res);
  }
  else{
    res.json({error: 'Invalid URL'});
  }
});

router.get('/:shortid', function(req, res){
  UrlController.UrlRedirect(req, res);
});

router.all('*', function(req, res){
  console.log('No routes');
  res.json({error: 'No matching routes'});
})

module.exports = router;
