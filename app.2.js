var express = require('express');
var bodyParser = require('body-parser');    // for post method, push body json to req.body
var static = require('serve-static');       // for static folder
var mongoose = require('mongoose');

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

    if (database) {
        authUser(database, paramId, paramPassword, function (err, docs) {
            if (err) { throw err; }
            if (docs) {
                res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
                res.write('<p> success for authUser </p>');
                res.end();
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
                res.write('<p> failure for authUser </p>');
                res.end();
            }
        });
    }
});

router.route('/adduser').post(function (req, res) {
    console.log('adduser post called.');

    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;

    if (database) {
        addUser(database, paramId, paramPassword, paramName, function (err, result) {
            if (err) { throw err; }
            console.dir(result);
            if (result) {
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

var database;
var UserSchema;
var UserModel;

function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';
    mongoose.Promise = global.Promise;  // ??
    mongoose.connect(databaseUrl, { useNewUrlParser: true });
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', function () {
        console.log('DB: connected at' + databaseUrl);
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        UserModel = mongoose.model('users', UserSchema);
    })
}

var authUser = function (database, id, password, callback) {
    console.log("authUser()");
    UserModel.find({ "id": id, "password": password }, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        console.dir(results);
        if (results.length > 0) {
            console.log('found!');
            callback(null, results)
        } else {
            console.log('not found!');
            callback(null, null);
        }
    });
}

var addUser = function (database, id, password, name, callback) {
    console.log("addUser()");
    var user = new UserModel({ "id": id, "password": password, "name": name });
    user.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('user record is added.');
        callback(null, user);
    });
}

app.listen(app.get('port'), function () {
    console.log('server start at ' + app.get('port'));
    connectDB();
});