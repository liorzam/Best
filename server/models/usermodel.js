var mongoose = require('mongoose'), User = mongoose.model('User'), encrypt = require('../utilities/encryption');


exports.deleteUser = function(req, res) {
	User.remove({
		"_id": mongoose.Types.ObjectId(req.params.id.toString())
	}, function(error, response) {
		if (!error) {
			return res.end();
		} else {
			err = new Error('Cannot delete this user');

			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
	});
}


exports.createUser = function createUser(req, res, next) {
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    userData.createdAt = new Date().getDate();
	User.create(userData, function(err, user) {
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error('Duplicate Username');
			}
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			res.send(user);
		});
	});
};


exports.updateUser = function(req, res) {
	var userUpdates = req.body;
	User.findOne({
		"_id": mongoose.Types.ObjectId(userUpdates._id.toString())
	}, function(err, user) {
		if (err) {
			return next(err);
		}
		user.city = userUpdates.city;
		user.lastName = userUpdates.lastName;
		user.firstName = userUpdates.firstName;
		user.username = userUpdates.username.toLowerCase();
		if (userUpdates.password && userUpdates.password.length > 0) {
			user.salt = encrypt.createSalt();
			user.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password);
		}
		user.save(function(err) {
			if (err) {
				return next(err);
			}

			return res.end();
		});
	});
};

exports.getAllUsers = function (req, res) {
        User.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    };