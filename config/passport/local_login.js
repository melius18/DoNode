var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    console.log('passport(local-login): ' + email + ', ' + password);

    var database = req.app.get('database');
    database.UserModel.findOne({ 'email': email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            console.log('no account');
            return done(null, false, req.flash('loginMessage', 'no account'));
        }
        if (password !== user._doc.password) {
            return done(null, false, req.flash('loginMessage', 'incorrect password'));
        }
        console.log('correct password');
        return done(null, user);
    });
});