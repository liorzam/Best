var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    mongoose: require('mongoose'),
    passport: require('passport'),
    encrypt: require('../utilities/encryption'),
    development: {
        db: 'mongodb://localhost/DB',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        facebookAuth: {
            clientID: '1489834834581403', // your App ID
            clientSecret: 'b06f239300b06da9b13dffb0bb0e8004', // your App Secret
            callbackURL: 'http://localhost:' + process.env.PORT || 3030 + '/auth/facebook/callback'
        }
    }
}