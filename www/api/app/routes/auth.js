var UserModel = require('../models/user')


var routes = function (router, passport){

	router.options('/*',function(req,res){
		res.send("Ok")
	})

	router.post('/login', passport.authenticate('local-login'), function(req, res){
		console.log(req.user)
		res.send(JSON.stringify({token : req.user.token}))
	})

	router.get('/validate', function(req,res, next){ passport.authenticate('bearer', function(err, user, info){
					if (user)
						res.status(200)
					else
						res.status(403)

					return res.end()
			})(req,res,next)
	})

	router.post('/signup', function (req, res, next){
		passport.authenticate('local-signup', function (err, user, info){
			if (user)
				res.status(201)
			else
				res.status(403)
			res.end()
		})(req,res, next)
	})

	router.get('/:username/:password', function(req,res){
		console.log('/:username/:password')
		var newUser = new UserModel()
		newUser.local.user = req.params.username
		newUser.local.pwd  = req.params.password
		newUser.save(function(err){
				if (err)
					throw err
				res.send('User Registered')
		})
	})
	
}

module.exports = routes
