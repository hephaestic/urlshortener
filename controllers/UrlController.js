var UrlModel = require('../models/UrlModel.js');
var shortid = require('shortid');

exports.index = function(req, res){
  UrlModel.find(function(err, result){
    if(err) {
      console.log('Url not found');
      res.json(err);
    }
    else {
      res.pageInfo ={};
      res.pageInfo.title = 'Urls';
      res.pageInfo.urls = result;
      res.json(res.pageInfo);
    }
  });
};

exports.UrlCreate = function(req, res){
  var longurl = req.longurl;
  var shorturl = shortid.generate();
  var u = new UrlModel({
    longurl: req.longurl,
    shorturl: shortid.generate()
  });

  u.save(function(err){
    if(err){
      console.log('Couldnt save new url');
      res.json(err);
    } else {
      res.json({
        longurl: u.longurl,
        shorturl: req.protocol + '://' + req.get('host') + '/' + u.shorturl
      });
    }
  })
};

exports.UrlRedirect = function(req, res){
  if(!shortid.isValid(req.params.shortid)){
    console.log('Not a valid short url');
    res.json({error: 'Not a valid short url'});
  } else {
    UrlModel.findOne(
      {shorturl: req.params.shortid},
      function(err, result){
        if(err) {
          console.log('Couldnt find shorturl');
          res.json(err);
        }
        res.redirect(result.longurl);
      }
    );
  }
};
