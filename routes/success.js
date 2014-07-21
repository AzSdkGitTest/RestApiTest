
/*
 * GET home page.
 */

exports.content= function(req, res){
  code = req.params['code'];
  res.set('Content-type', 'text/xml');
  res.set('Cache-Control', 'no-store');
  res.status(code).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Success><Code>' + code + '</Code></Success>');
};

exports.noContent= function(req, res){
  code = req.params['code'];
  res.status(code).end();
  console.log(res)
};