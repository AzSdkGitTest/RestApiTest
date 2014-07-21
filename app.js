
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
app.all('/success/code/:code', success.noContent);
app.all('/content/code/:code', success.content);

app.all('/redirectstart/code/:code/positive/:isPositive', redirect.location);
app.all('/redirectend/verb/:verb/positive/:isPositive', redirect.validate);

app.all('/client/code/:code/message/:message', clientError.content);

app.all('/server/code/:code/message/:message', serverError.content);
app.all('/server', serverError.http);



app.get('/deserialize/:type/:value', deserialize.deserialize);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
