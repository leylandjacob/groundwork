/**
 * File Name : /routes/api/users
 * Description: 
 *
 * Notes: 
 * 
*/

// required modules
var express = require('express');
var router = express.Router();
require('express-jsend');
var UserLib= require('../../libs/user');
var messages = require('../../config/config-messages');

// models
var UserModel = require('../../models/users');


/**
 * Route: /api/users/:id
 * Method: GET
 * Description: Get user by ID
 * 
 * @param id {String} 
 * @return user {Object}
 *
 */
router.get('/:id', function(req, res) {
	
	var query = {_id : req.params.id };
	
	UserModel.findOne( query , function(error, user) {
	
		if( error || !user) {
			
			winston.error(error ? error.message : 'No User Found for id ' + req.paramsid);
			res.jerror('Bad Request', 'No User found');
			
		} else {
		
			res.jsend(user);
			
		}
	});
	
});

/**
 * Route: /api/users/
 * Method: POST
 * Description: 
 * 
 * @param id {String} 
 * @return user {Object}
 *
 */
router.post('/', function(req, res) {

	var email = req.body.email;
	var password = req.body.password;

	// TODO: add validation and respond with jerrors

	var newUser = new UserModel({
		email	: email,
		password: password
	});

	newUser.save( function(error, user) {

		if( error ) {

			winston.error(error.message);

			// email taken
			if(error.code === 11000){

				res.jerror('Bad Request', messages.userEmailTaken);

			} else {

				res.jerror(error);

			}

		} else {

			req.login(user, function (error) {

				if( error ) {

                    winston.error(error.message);
					res.jerror(error.message, error);

				} else {

					res.jsend(user);

				}

			});
		}

	});

});


/**
 * Route: /api/users/:id
 * Method: PUT
 * Description: Update a user by ID
 * 
 * @param id {String} 
 * @return user {Object}
 *
 */
router.put('/:id', function(req, res) {

	var query = {_id : req.params.id};
	
	var data = req.body;
	
	delete data._id;	
		
	UserModel.findByIdAndUpdate( query, data, {}, function(error, user) {
		
		if (error || !user) {

			winston.error(error ? error.message : 'No User Found for id ' + req.params.id);
			res.jerror('Bad request', 'No Users found');
						
		} else {
			
			UserLib.updateIntercom(user, function(){
				res.jsend(user);
			});
			
			
		}
	});					
	
});


/**
 * Route: /api/users/
 * Method: DELETE
 * Description: 
 * 
 * @param id {String} 
 * @return user {Object}
 *
 */
router.delete('/:id', function(req, res) {
	
	winston.error("We don't currently support DELETE user requests");
	res.jerror('Bad request', 'We don"t currently support user delete requests');
	
});


module.exports = router;