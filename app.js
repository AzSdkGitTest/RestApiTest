
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var deserialize = require('./routes/deserialize');
var redirect = require('./routes/redirect');
var success = require('./routes/success');
var clientError= require('./routes/clienterror');
var serverError = require('./routes/servererror');
var uriHandler = require('./routes/urihandler');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('*', function (req, res, next) {
    res.set('Connection', 'close');
    next();
});

app.get('/uris/*', uriHandler.content);
app.post('/uris/*', uriHandler.queryObject);
app.get('/urioptional', uriHandler.baseOption);
app.get('/urioptional/params1/:params1', uriHandler.firstParam);
app.get('/urioptional/params2/:params2', uriHandler.secondParam);
app.get('/urioptional/params1/:params1/params2/:params2', uriHandler.bothParams);

app.all('/success/code/:code', success.noContent);
app.all('/content/code/:code', success.content);

app.all('/redirectstart/code/:code/positive/:isPositive', redirect.location);
app.all('/redirectend/verb/:verb/positive/:isPositive', redirect.validate);

app.all('/client/code/:code/detailCode/:detailCode/message/:message', clientError.content);

app.all('/server/code/:code/detailCode/:detailCode/message/:message/tries/:tries', serverError.contentRetry)
app.all('/server/code/:code/detailCode/:detailCode/message/:message', serverError.content);
app.all('/server', serverError.http);



app.get('/deserialize/:type/:value', deserialize.deserialize);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
