/**
 * File Name : models/tokens.js
 * Description: Token Model
 *
 * Notes:
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
	user_id			: { type: Schema.Types.ObjectId, ref: 'users' },
	token			: String, 
	company			: String,
	url				: Number,
	type			: { type: String, default: 'password' },
	used			: { type: Number, default: 0 },
	active 			: { type: Boolean, default: true },
	date_created	: { type: Date, default: Date.now },
	date_expires	: Date,
});

module.exports = mongoose.model('tokens', TokenSchema); 