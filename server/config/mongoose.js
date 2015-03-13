var mongoose = require('mongoose'),
    crypto = require('crypto');

//Export and get config file for create our DB
module.exports = function (config) {
    // Connect
    mongoose.connect(config.db);
    // Save Our DB
    var db = mongoose.connection;

    //Check for errors
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('The db opened');
    });


    var userSchema = mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        photo : {
          type : String  
        },
        createdAt: {
            type: Date
        },
        facebook: {
            type: String
        },
        username: {
            type: String,
            required: '{PATH} is required!',
            unique: true
        },
        provider: {
            type: String,
        },
        city: {
            type: String
        },
        salt: {
            type: String
        },
        hashed_pwd: {
            type: String,
            required: '{PATH} is required!'
        },
        roles: [String]
    });

    //User Scheme
    //    var userSchema = mongoose.Schema({
    //        firstName: String,
    //        lastName: String,
    //        username: String,
    //        provider: String,
    //        city: String,
    //        salt: String,
    //        hashed_pwd: String,
    //        roles: [String]
    //    });


    // we wanna to extend the user and add authenticate method!
    userSchema.methods = {
        //Gets the user password and uncrypto the password
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model('User', userSchema);

    //For initilaize
    User.find({}).exec(function (err, collection) {
        // look for users if there none so create some
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'lior'); // get the hash for the pass word
            User.create({
                firstName: 'Lior',
                lastName: 'Zamir',
                username: 'lior',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });

            salt = createSalt();
            hash = hashPwd(salt, 'aviv');
            User.create({
                firstName: 'Aviv',
                lastName: 'Mizrahi',
                username: 'aviv@gmail.com',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
        }
    });
};




// Return string for crypto
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

// create the hash with the salt and the pass
function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}