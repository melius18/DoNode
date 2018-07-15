var route_loader = {};

route_loader.init = function (app, router, passport) {
    return initRoutes(app, router, passport);
}

function initRoutes(app, router, passport) {
    router.route('/').get(function (req, res) {
        console.log('/: get');
        res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<p> root page </p>');
        res.end();
    });

    router.route('/login').get(function (req, res) {
        console.log('/login: get');
        res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<p>' + req.flash('loginMessage') + '</p>');
        res.end();
    });

    router.route('/login').post(passport.authenticate('local-login',
        {
            successRedirect: '/profile'
            , failureRedirect: '/login'
            , failureFlash: true
            //, session: false
        }
    ));

    router.route('/signup').get(function (req, res) {
        console.log('/signup: get');
        res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<p>' + req.flash('signupMessage') + '</p>');
        res.end();
    });

    router.route('/signup').post(passport.authenticate('local-signup',
        {
            successRedirect: '/profile'
            , failureRedirect: '/signup'
            , failureFlash: true
        }
    ));

    router.route('/profile').get(function (req, res) {
        console.log('/profile: get');
        console.dir(req.user);

        if (!req.user) {
            console.log('no auth user');
            res.redirect('/');
            return;
        }
        console.log('auth user');
        if (Array.isArray(req.user)) {
            res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
            res.write('<p>' + req.user[0]._doc.email + '</p>');
            res.write('<p>' + req.user[0]._doc.name + '</p>');
            res.end();
        } else {
            res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
            res.write('<p>' + req.user.email + '</p>');
            res.write('<p>' + req.user.name + '</p>');
            res.end();
        }
    });

    router.route('/logout').get(function (req, res) {
        console.log('/logout: get');
        req.logout();
        res.redirect('/');
    });
    app.use('/', router);
}

module.exports = route_loader;