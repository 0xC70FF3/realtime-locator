// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http           = require('http').Server(app);
var io 			   = require('socket.io')(http);

// configuration ===========================================
var conf = require('./config/default');
var port = process.env.PORT || conf.port; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// bind application=========================================
application = require('./app/application')
application.routes(app)
application.bind(io)

// start app ===============================================
http.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
