var mongoose = require('mongoose')


var userSchema = mongoose.Schema({
	local : {
		user: String,
		pwd: String
	}
})


module.exports = mongoose.model('User', userSchema)