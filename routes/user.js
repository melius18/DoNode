var login = function (req, res) {
    console.log('login post called.');

    var paramEmail = req.body.email;
    var paramPassword = req.body.password;
    var database = req.app.get('database');

    if (database.db) {
        authUser(database, paramEmail, paramPassword, function (err, docs) {
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
}

var adduser = function (req, res) {
    console.log('adduser post called.');

    var paramEmail = req.body.email;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    var database = req.app.get('database');

    if (database.db) {
        addUser(database, paramEmail, paramPassword, paramName, function (err, results) {
            if (err) {
                console.log("error :" + err); 
                console.dir(err); 
                throw err; 
            }
            console.dir(results);
            if (results) {
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
}

var listuser = function (req, res) {
    var database = req.app.get('database');

    if (database.db) {
        database.UserModel.findAll(function (err, results) {
            if (err) { throw err; }
            console.dir(results);
            if (results) {
                console.dir(results);
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>user list</h2>');
                res.write('<div><ul>');

                for (var i = 0; i < results.length; i++) {
                    var curId = results[i]._doc.email;
                    var curName = results[i]._doc.name;
                    res.write('    <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
                }

                res.write('</ul></div>');
                res.end();
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2> failure for user list </h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2> failure for connecting to db </h2>');
        res.end();
    }

};

var authUser = function (database, email, password, callback) {
    console.log("authUser()");
    database.UserModel.find({ "email": email, "password": password }, function (err, results) {
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

var addUser = function (database, email, password, name, callback) {
    console.log("addUser()");
    var user = new database.UserModel({ "email": email, "password": password, "name": name });
    user.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('user record is added.');
        callback(null, user);
    });
}

module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;
