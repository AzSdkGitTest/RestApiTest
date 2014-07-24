
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

exports.contentRetry= function(req, res){
  var status = req.params['code'];
  var detailCode = req.params['detailCode'];
  var message = decodeURIComponent(req.params['message']);
  var tries = parseInt(req.params['tries']);
  var cookieTries;
  
  var cookies = req.headers['cookie'];
  var cookieMatch;
  if (cookies)
  {
      cookieMatch = /tries=(\d+)/.exec(cookies);
      if (cookieMatch && cookieMatch[1])
      {
      	cookieTries = cookieMatch[1];
      	tries = parseInt(cookieTries);
      }
  }
  tries = tries - 1;
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'text/xml');
  if (tries > 0)
  {
  	res.cookie('tries', tries, {'maxAge': 900000});
 
  res.status(status).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>' 
  	+ detailCode + '</Code>\r\n<Message>' + message + '</Message>\r\n</Error>').end();
  }
  else 
  {
  	res.clearCookie('tries');
    res.status(204).end();
  }
};

exports.http= function(req, res){
  res.set('Cache-Control', 'no-store');
  res.status(500).render('htmlerror');
};