
/*
 * GET home page.
 */

exports.content= function(req, res){
  var status = req.params['code'];
  var detailCode = req.params['detailCode'];
  var message = decodeURIComponent(req.params['message']);
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'text/xml');
  res.status(status).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>' 
  	+ detailCode + '</Code>\r\n<Message>' + message + '</Message>\r\n</Error>').end();
};