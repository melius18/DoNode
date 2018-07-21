var local_login = require('./passport/local_login');
var local_signup = require('./passport/local_signup');
var facebook = require('./passport/facebook');

module.exports = function(app, passport) {
    console.log("config/passport");

    // ra.0721 6. serialization : save user info to session when auth success
    passport.serializeUser(function (user, done) {
        console.log("serializeUser()");
        console.dir(user);
        done(null, user);
    });
    
    // ra.0721 7. deserialization : load user info from session
    passport.deserializeUser(function (user, done) {
        console.log("deserializeUser()");
        console.dir(user);
        done(null, user);   // save at req.user after login
    });

    // ra.0721 5. strategy setting
    passport.use('local-login', local_login);
    passport.use('local-signup', local_signup);

    // ra.0722
    passport.use('facebook', facebook(app, passport));
}
