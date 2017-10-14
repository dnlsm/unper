var mongoose = require('mongoose')


var userSchema = mongoose.Schema({
	token : Number,
	local : {
		user: {type: String, required: true, unique: true},
		pwd:  {type: String, required: true}
	}
})


module.exports = mongoose.model('Users', userSchema)
