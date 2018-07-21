// bungi02: facebook strategy

var express = require('express');
var bodyParser = require('body-parser');    // for post method, push body json to req.body
var static = require('serve-static');       // for static folder
var config = require('./config');
var database = require('./database/database');

// ra.0722 1. https
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('C:/_rfolder/src/https/key.pem'),
    cert: fs.readFileSync('C:/_rfolder/src/https/cert.pem')
};

// ra.0721 1. passport module import
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var expressSession = require('express-session');

var app = express();
app.set('port', process.env.PORT || config.sever_port1);
app.set('views', __dirname + '/views');

// view engine setting
// app.set('view engine', 'ejs');
app.set('view engine', 'pug');

var configPassport = require('./config/passport');
configPassport(app, passport);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// ra.0721 2. passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routing
var router = express.Router();
var router_loader = require('./routes/route_loader');
router_loader.init(app, router, passport);

// ra.0722 2. https server
// app.listen(app.get('port'), function () {
//     console.log('server start at ' + app.get('port'));
//     database.init(app, config);
// });

https.createServer(options, app).listen(config.sever_port2, function(){
    console.log('server start at ' + config.sever_port2);
    database.init(app, config);
});
