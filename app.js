var express = require('express');
var bodyParser = require('body-parser');    // for post method, push body json to req.body
var static = require('serve-static');       // for static folder
var config = require('./config');
var database = require('./database/database');
var app = express();

app.set('port', process.env.PORT || config.sever_port);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
var router = express.Router();
var router_loader = require('./routes/route_loader');
router_loader.init(app, router);

app.listen(app.get('port'), function () {
    console.log('server start at ' + app.get('port'));
    database.init(app, config);
});