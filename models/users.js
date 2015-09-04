/**
 * File Name : models/users.js 
 * Description: User Model
 *
 * Notes: 
 * 
 */

// required modules
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email							: { type: String, unique: true, lowercase: true, trim: true },
	password						: String,
	active							: { type: Boolean, default: true },
	date_last_login					: { type: Date, default: Date.now },
	date_created					: { type: Date, default: Date.now }
});

/**
 * Description: Presave bcrypt middleware
 */
UserSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

/**
 * comparePassword() verify password
 *
 * @param candidatePassword
 * @param callback
 */
UserSchema.methods.comparePassword = function(candidatePassword, callback) {

	bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {

		if(error) {

			callback(error);

		} else {

			callback(null, isMatch);

		}

	});
};

module.exports = mongoose.model('users', UserSchema);