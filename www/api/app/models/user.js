var mongoose = require('mongoose')


var userSchema = mongoose.Schema({
	token : Number,
	local : {
		user: String,
		pwd: String
	}
})


module.exports = mongoose.model('User', userSchema)