var localStrategy = require('passport-local').Strategy
var User = require('../app/models/user')


module.exports = function (passport){

		passport.use('local-login', new localStrategy({
				usernameField: 'user',
				passwordField: 'pwd'
			},
			function (username, password, done){
				User.findOne({'local.user': username}, function(err, user){
					if (err) return done(err)
					if (!user) return done(null, false, {message: 'Incorrect User/Password'})
					if (user.local.pwd === password) return done(null, user)
					return done(null, false, {message: 'Incorrect User/Password'})
				})
			}


		))

}
