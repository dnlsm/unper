var devices = [{name: "LED", pin: 26, value: true},
				{name: "LAMPADA", pin: 19, value: false}]

module.exports = function(router, passport){

	router.use(passport.authenticate('bearer', { session: false }))

	router.get('/app', function(req,res){
		res.send('Test')
	})
	router.get('/devices', function(req, res){
		res.send(JSON.stringify(devices))
	})
}