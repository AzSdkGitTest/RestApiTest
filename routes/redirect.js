
/*
 * GET home page.
 */

exports.location= function(req, res){
  code = req.params['code'];
  isPositive = req.params['isPositive'];
  res.redirect(parseInt(code), '/redirectend/verb/' + req.method + '/positive/' + isPositive);
};

exports.validate= function(req, res){
  verb = req.params['verb'];
  code = req.params['code'];
  isPositive = req.params['isPositive'];
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'text/xml');
  if (req.method != verb)
  {
  	res.status(400).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>BadVerb</Code><Message>TReceived bad verb ' + req.method + '</Message></Error>').end();
  }
  if (!isPositive)
  {
  	res.status(400).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>ExpectedNegative</Code><Message>This is an expected negative response which shoudl create an expected exception</Message></Error>').end();
  	
  }
  else
  {
  	res.status(200).send('<?xml version="1.0" encoding="utf-8"?>\r\n<Redirect>\r\n<Success>true</Success>\r\n</Redirect>').end();
  }
};