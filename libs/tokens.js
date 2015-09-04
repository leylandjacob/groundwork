/**
 * File Name : libs/token.js
 * Description: Token Library
 *
 * Notes:
 *
 */

// required modules
var keys = require('../config/config-keys');
var Utils = require('../libs/utils');

// models
var TokenModel = require('../models/tokens');


module.exports = {

    generatePasswordToken: function(userId, callback){

        var token = Utils.generateToken();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        var tokenModel = new TokenModel({
            token: token,
            active: true,
            date_expires : tomorrow,
            user_id : userId
        });

        tokenModel.save(function ( error , token) {
             callback(error, token);
        })
    }

};