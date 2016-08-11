var UrlModel = require('../models/UrlModel.js');
var shortid = require('shortid');

exports.index = function(req, res){
  UrlModel.find(function(err, result){
    if(err) {
      console.log('Url not found');
    }
    else {
      res.pageInfo.title = 'Urls';
      res.pageInfo.urls = result;
      response.json(res.pageInfo);
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
      //res.json({error: 'Couldnt save new url'})
    } else {
      res.json({
        longurl: u.longurl,
        shorturl: req.protocol + '://' + req.get('host') + '/' + u.shorturl
      });
    }
  })
};

exports.UrlRedirect = function(req, res){
  UrlModel.findOne(
    {shorturl: req.params.shortid},
    //longurl,
    function(err, result){
      if(err) {
        console.log('Couldnt find shorturl');
        res.json(err);
      }
      res.redirect(result.longurl);
    }
  );
};
