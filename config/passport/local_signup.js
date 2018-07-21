var LocalStrategy = require('passport-local').Strategy;

// ra.0721 4. verify callback (local-signup)
module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    console.log('passport(local-signup): ' + email + ', ' + password);
    var paramName = req.body.name;
    process.nextTick(function () {
        var database = req.app.get('database');
        database.UserModel.findOne({ 'email': email }, function (err, user) {
            if (err) { return done(err); }
            if (user) {
                console.log('already account');
                return done(null, false, req.flash('signupMessage', 'already account'));
            } else {
                var user = new database.UserModel({ 'email': email, 'password': password, 'name': paramName });
                user.save(function (err) {
                    if (err) { throw err; }
                    console.log('add account');
                    return done(null, user);
                });
            }
        });
    });
});
