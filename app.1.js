var express = require('express');
var bodyParser = require('body-parser');    // for post method, push body json to req.body
var static = require('serve-static');       // for static folder

var app = express();

app.set('port', process.env.PORT || 3000);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
var router = express.Router();

router.route('/login').get(function (req, res) {
    console.log('login get called.');

    var paramId = req.query.id;
    var paramPassword = req.query.password;

    res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<p>' + paramId + '</p>');
    res.write('<p>' + paramPassword + '</p>');
    res.end();
});

router.route('/login').post(function (req, res) {
    console.log('login post called.');

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<p>' + paramId + '</p>');
    res.write('<p>' + paramPassword + '</p>');
    res.end();
});

router.route('/adduser').post(function (req, res) {
    console.log('adduser post called.');

    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;

    if (database) {
        addUser(database, paramId, paramPassword, paramName, function (err, result) {
            if (err) { throw err; }
            if (result && result.insertedCount > 0) {
                res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
                res.write('<p> success for addUSer </p>');
                res.end();
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
                res.write('<p> failure for addUSer </p>');
                res.end();
            }
        });
    }
});

app.use('/', router);

var MongoClient = require('mongodb').MongoClient;
var database;

function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';
    MongoClient.connect(databaseUrl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log('database connected at ' + databaseUrl);
        database = db.db('local');
    });
}

var addUser = function (database, id, password, name, callback) {
    console.log("addUser()");
    console.dir(database);
    var users = database.collection('users');

    users.insertMany([{ id: id, password: password, name: name }], function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }

        if (result.insertedCount > 0) {
            console.log('user record is added.: ' + result.insertedCount);
        } else {
            console.log('no recored added.');
        }
        callback(null, result);
    });
}

app.listen(app.get('port'), function () {
    console.log('server start at ' + app.get('port'));
    connectDB();
});