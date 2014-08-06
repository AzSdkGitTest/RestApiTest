
/*
 * GET home page.
 */

exports.content= function(req, res){
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'application/json');
  var obj = {};
  obj['RequestUriPath'] = req.path;
  var arr = [];
  var i = 0;
  for (var param in req.query)
  {
      arr[i]  = param + "=" + req.query[param];
      i++;
  }
  obj['RequestUriParams'] = arr;
  obj['RequestOriginalUri'] = "http://localhost:3000" + req.originalUrl;

  console.log(req.query);
  console.log(obj);
  
  res.status(200).json(obj).end();
};

exports.queryObject = function(req, res) {
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'application/json');
  console.log(req.query);

  res.status(200).json(req.query).end();
};

exports.baseOption= function(req, res){
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'application/json');
  var obj = {};
  obj['RequestUriPath'] = "baseOption";
  obj['RequestUriParams'] = [];
  obj['RequestOriginalUri'] = "http://localhost:3000" + req.originalUrl;
  res.status(200).json(obj).end();
};

exports.firstParam= function(req, res){
  var param1 = req.params['params1'];
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'application/json');
  var obj = {};
  obj['RequestUriPath'] = "firstParamOnly";
  var arr = [];
  arr[0] = "param1=" + param1;
  obj['RequestUriParams'] = arr;
  obj['RequestOriginalUri'] = "http://localhost:3000" + req.originalUrl;
  res.status(200).json(obj).end();
};

exports.secondParam= function(req, res){
  var param2 = req.params['params2'];
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'application/json');
  var obj = {};
  obj['RequestUriPath'] = "secondParamOnly";
  var arr = [];
  arr[0] = "param2=" + param2;
  obj['RequestUriParams'] = arr;
  obj['RequestOriginalUri'] = "http://localhost:3000" + req.originalUrl;
  res.status(200).json(obj).end();
};

exports.bothParams= function(req, res){
  var param1 = req.params['params1'];
  var param2 = req.params['params2'];
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'application/json');
  var obj = {};
  obj['RequestUriPath'] = "bothParams";
  var arr = [];
  arr[0] = "param1=" + param1;
  arr[1] = "param2=" + param2;
  obj['RequestUriParams'] = arr;
  obj['RequestOriginalUri'] = "http://localhost:3000" + req.originalUrl;
  res.status(200).json(obj).end();
};
