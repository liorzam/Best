var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    encrypt = require('../utilities/encryption'),
    User = mongoose.model('User');

module.exports = function (config) {

    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }).exec(function (err, user) {
            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.use(new FacebookStrategy({
            clientID: '460365767448168',
            clientSecret: '043ae435a6bbc400ef4749621eca7183',
            callbackURL: 'http://localhost:3030/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos']
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Facebook profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Facebook account with a user record in your database,
                // and return that user instead.
                //check user table for anyone with a facebook ID of profile.id
                User.findOne({
                    'username': profile.id
                }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    
                    //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                    if (!user) {
                        console.log('Create New User');
                        var salt, hash;
                        salt = encrypt.createSalt();
                        hash = encrypt.hashPwd(salt, profile.displayName);

                        user = new User({
                            firstName: profile.displayName.split(' ')[0],
                            lastName: profile.displayName.split(' ')[1],
                            photo : profile.photos[0].value,
                            username: profile.id,
                            createdAt : new Date(),
                            provider: 'facebook',
                            facebook: JSON.stringify(profile._json),
                            salt: salt,
                            hashed_pwd: hash,
                            roles: []
                        });

                        user.save(function (err) {
                            if (err) console.log(err);
                            return done(err, user);
                        });
                    } else {
                        console.log('User Already exsit');
                        //found user. Return
                        return done(err, user);
                    }
                });
            });
        }));

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })

}