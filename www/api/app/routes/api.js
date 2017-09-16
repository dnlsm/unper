var devices = 
[
	{
		devName: 'Sala',
		peripherals: [
			{
				name: 'Lampada',
				class: 'LAMP'
			}
		]
	},
	{
		devName: 'Cozinha',
		peripherals: [
			{
				name: 'Ldr Dia',
				class: 'LDR',
				type: 'INPUT',
				triggers:[
					{
						type: 'CLEAR_TRIGGER'
					}
				]
			},
			{
				name: 'IR'
			}
		]
	}
]

module.exports = function(router, passport){

	router.use(passport.authenticate('bearer', { session: false }))

	router.get('/app', function(req,res){
		res.send('Test')
	})
	router.get('/devices', function(req, res){
		res.send(JSON.stringify(devices))
	})
}