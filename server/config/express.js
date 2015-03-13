var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');

module.exports = function (app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.configure(function () {
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

            // intercept OPTIONS method
            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }
        });

        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());

        app.use(express.session({
            secret: 'The Screeners'
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        //app.use(stylus.middleware(
        //  {
        //    src: config.rootPath + '/public',
        //    compile: compile
        //  }
        //));
        app.use(express.static(config.rootPath + '/public'));
    });
}