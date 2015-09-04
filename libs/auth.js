/**
 * File Name : libs/auth.js 
 * Description: Auth Library
 *
 * Notes: 
 * 
 */
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var keys = require('../config/config-keys');
var messages = require('../config/config-messages');
var UserModel = require('../models/users');

/**
 * Serialize the user in to the session
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

/**
 * Deserialize the user in to the session
 */
passport.deserializeUser(function(id, done) {
	UserModel.findOne({ _id : id }, function(error, user) {
		done(null, user);
	});

});

/**
 *
 * Setup the Passport local authentication.
 *
 *
 */
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        UserModel.findOne({ email: email }, function(error, user) {

            if (error) {
                winston.error(error.message ? error.message : 'Error finding user to login.');
                return done(messages.loginError);
            }

            if (!user) {
                return done(null, false, messages.userNotFound);
            }

            // compare the passwords
            user.comparePassword(password, function(error, isMatch) {

                if (error) {
                    winston.error(error.message ? error.message : 'Error comparing passwords.');
                    return done(messages.loginError);
                }

                if(!isMatch) {

                    return done(null, false, messages.passwordIncorrect);

                }

                UserModel.findByIdAndUpdate(user.id, { date_last_login : Date.now() }, function(error, user){
                    return done(null, user);
                });

            });
        });
    }
));

