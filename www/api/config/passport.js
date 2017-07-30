var localStrategy = require('passport-local').Strategy
var bearerStrategy = require('passport-http-bearer').Strategy

var User = require('../app/models/user')

module.exports = function (passport){
		passport.serializeUser(function(user, done){
				done(null, user._id)
		})

		passport.deserializeUser(function(id, done){
				User.findById(id, function(err, user){
						done(err, user)
				})
		})

		passport.use('local-login', new localStrategy({
				usernameField: 'username',
				passwordField: 'password'
			},
			function (username, password, done){

				console.log('Logando: {%s, %s}', username, password)
				User.findOne({'local.user': username}, function(err, user){
					if (err) return done(err)
					if (!user) return done(null, false, {message: 'Incorrect User/Password'})
					if (user.local.pwd === password){
						user.token = Math.floor(Math.random()*Math.pow(2,32))

						User.findOneAndUpdate(
							{'local.user': username},
							{'$set': {'token' : user.token}},
							function(err){
								if (err) throw err
								done(null, user)
							})

					}
					else return done(null, false, {message: 'Incorrect User/Password'})
				})
			}
		))


		passport.use('local-signup', new localStrategy({
				usernameField: 'username',
				passwordField: 'password'
			},
			function (username, password, done){

				console.log('Logando: {%s, %s}', username, password)
				User.findOne({'local.user': username}, function(err, user){
					if (err) return done(err)
					if (user) return done(null, false, {message: 'User already exists'})
					else 
						var newUser = new User()

						newUser.local.user = username
						newUser.local.pwd = password

						newUser.save(function (err){
							if (err)	throw err
							return done(null, newUser)
						});
				})
			}
		))



		passport.use(new bearerStrategy(
			function (token, done){
				console.log("Token = %s", token)
				var token1 = parseInt(token)
				console.log("Token = %s", token1)
				User.findOne({'token': token1}, function (err, user){
					console.log(err)
					console.log(user)

					if (!user) return done(null, false)

					return done(null, user)

				})
			}
		))
}
