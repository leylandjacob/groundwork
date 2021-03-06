/**
 * File Name : libs/utils.js
 * Description: Utils Library
 *
 * Notes:
 *
 */

// required
var crypto = require("crypto");

// models
var TokenModel = require('../models/tokens');


module.exports = {

    /*
     * generateToken() generate an API token
     *
     * @param {Number} length
     * @return {String}
     *
     */
    generateToken: function(length){
       return crypto.randomBytes(16).toString('hex');
    },


    /*
     * incrementToken() Increments the usage of an api token
     *
     * @param {Object} tokenModel
     *
     *
     */
    incrementToken: function(tokenModel) {
        var i = parseInt(tokenModel.used) + 1;
        TokenModel.findByIdAndUpdate( tokenModel.id, { used: i }, {}, function(error, t){});
    },


    /*
     * guid() create a GUID
     *
     * @return {String}
     *
     */
    guid: function() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    },


    /*
     * s4() ???
     *
     * @return {String}
     *
     */
    s4: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },


    /*
     * getFileExt() get a file extension
     *
     * @return {String}
     *
     */
    getFileExt: function(filename) {
        return filename.split('.').pop();
    },


    /*
     * getUniqueFileName() generate a uniqe filename
     *
     * @param {String} fileName
     * @return {String}
     *
     */
    getUniqueFileName: function(fileName) {
        return this.guid() + '.' + this.getFileExt(fileName);
    },


    /*
     * getHash() ???
     *
     * @param {?} value
     * @return {String}
     *
     */
    getHash: function(value) {
        return crypto.createHash("md5").update(value).digest("hex");
    },


    /*
     * authApiRequest() Authenticate an API request
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} Next
     *
     */
    authApiRequest: function(req, res, next) {

        var token = req.query.token;

        if (typeof token == 'undefined' || token == '') {
            return res.jerror('Not Authorized');
        }
        //TODO:
        //check db for token here
        //add more checks here
        //check req url with the url in the DB
        //use a secret/username to calculate the token
        //have tokens expire
        var query = { token : token, active: true}

        TokenModel.findOne( query , function( error, token ){

            if( error || token == null){

                winston.error('Error Invalid Token', {error: error, url : req.originalUrl});
                return res.jerror('Not Authorized');

            } else {

                return next();

            }
        });

    }

};
