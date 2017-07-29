var UserModel = require('./models/user')

var routes = function (app, passport){

	app.post('/login', passport.authenticate('local-login'), function(req, res){
		res.send('Ok')
	})

	app.get('/:username/:password', function(req,res){
		console.log('/:username/:password')
		var newUser = new UserModel()
		newUser.local.user = req.params.username
		newUser.local.pwd  = req.params.password
		newUser.save(function(err){
			if (err) throw err
				res.send('User Registered')
		})
	})
}

module.exports = routes
