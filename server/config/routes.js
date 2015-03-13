var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    fs = require("fs"),
    http = require("http"),
    userModel = require('../models/usermodel'),
    screenModel = require('../models/screen'),
    MongoClient = require('mongodb').MongoClient,
    passport = require('passport');

module.exports = function (app, config, encrypt) {

    app.get('/api/screen/:id', screenModel.screen);

    app.get('/api/users', auth.requiresRole('admin'), userModel.getAllUsers);

    app.post('/api/users', userModel.createUser);

    // Update run
    app.put('/api/users', auth.requiresApiLogin, userModel.updateUser);

    // Delete run
    app.delete('/api/users/:id', userModel.deleteUser);

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_status', 'user_checkins']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/fbLogInSuccses',
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.redirect('/');
        });

    app.get('/fbLogInSuccses', function (req, res) {
        var user = req.user;

        if (!user) {
            res.send({
                success: false
            })
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
//            res.send({
//                success: true,
//                user: user
//            });
            res.redirect('#/Succses');
        })
    });


    app.get('/partials/*', function (req, res) {

        try {
            var html = fs.readFile(config.rootPath + "public/app/" + req.params, function (err, html) {
                if (err) {
                    console.log("Cannot load the partial" + req.params);
                    return;
                }
                res.writeHeader(200, {
                    "Content-Type": "text/html"
                });
                res.write(html);
                res.end();

            });
        } catch (e) {

        }
    });

    app.post('/login/me', function (req, res, next) {
        if (req.isAuthenticated()) {
            res.send({
                success: true,
                user: req.user
            });
        } else {
            res.send({
                success: false
            });
        }
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('/api/Group', function (req, res) {
        MongoClient.connect("mongodb://localhost:27017/DB", function (err, db) {
            var collection = db.collection('msg');

            collection.aggregate({
                $group: {
                    _id: "$template",
                    total: {
                        $sum: 1
                    }
                }
            }, function (err, docs) {
                console.log('Send docs to respone');

                db.close();
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                /* The response type should be a JSON */
                res.write(JSON.stringify(docs));
                res.end();
            });
        });
    });

    app.get('*', function (req, res) {
        res.sendfile('index.html', {
            root: config.rootPath + "public/app"
        });
    });

};