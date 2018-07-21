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

    // ra.0721 8. strategy assign (local-login)
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

    // ra.0721 8. strategy assign (local-signup)
    router.route('/signup').post(passport.authenticate('local-signup',
        {
            successRedirect: '/signupsuc'
            , failureRedirect: '/signup'
            , failureFlash: true
        }
    ));

    router.route('/signupsuc').get(function (req, res) {
        // Change to ejs view engine
        res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
        var context = { title: 'signup success' }
        req.app.render('adduser', context, function (err, html) {
            if (err) {
                console.error('view engine error: ' + err.stack);
                res.write('<h2>view engine error</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                return;
            }
            res.end(html);
        });
    });

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
            // res.write('<p>' + req.user.email + '</p>');
            // res.write('<p>' + req.user.name + '</p>');
            // res.end();

            // Change to ejs view engine
            var context = { useremail: req.user.email, username: req.user.name }
            req.app.render('login_success', context, function (err, html) {
                if (err) {
                    console.error('view engine error: ' + err.stack);
                    res.write('<h2>view engine error</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();
                    return;
                }
                res.end(html);
            });
        }
    });

    router.route('/logout').get(function (req, res) {
        console.log('/logout: get');
        // ra.0721 9. logout
        req.logout();
        res.redirect('/');
    });

    // ra.0722
    router.route('/auth/facebook').get(passport.authenticate('facebook', {
        scope: 'email'
    }));

    router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.use('/', router);
}

module.exports = route_loader;