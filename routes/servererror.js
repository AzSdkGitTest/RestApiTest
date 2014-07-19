
/*
 * GET home page.
 */

exports.content= function(req, res){
  status = req.params['code'];
  message = req.params['message'];
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'text/xml');
  res.status(status).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>' 
  	+ message + '</Code>\r\n<Message>' + message + '</Message>\r\n</Error>').end();
};

exports.http= function(req, res){
  res.set('Cache-Control', 'no-store');
  res.status(500).render('htmlerror');
};