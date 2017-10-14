const Folder 		= require ('../models/folder')
const Peripheral 	= require ('../models/peripheral')
const Schedule 		= require ('../models/schedule')
const Trigger 		= require ('../models/trigger')

const Core			= require ('../core')

var lirc = require("../lirc/lirc")

module.exports = function(router, passport){

	router.use(passport.authenticate('bearer', { session: false }))

	router.get('/app', function(req,res){
		res.send('Test')
	})

	router.get('/peripheral',function(req, res){
		Peripheral.find({}, function (err, list){
			res.send(JSON.stringify(list))
		})
	})
	
	router.delete('/peripheral', function(req,res){
		Core.remPeripheral(req.body,
		function (err){
			if (err) res.
			else
		})
	})
	
	router.get('/schedules', function(req, res){
		Schedule.find({}, function (err, list){
			res.send(JSON.stringify(list))
		})		
	})

	router.get('/triggers', function(req, res){
		Trigger.find({}, function (err, list){
			res.send(JSON.stringify(list))
		})
	})

	router.get('/options', function(req, res){
		var obj = {
			peripheral: {
				port		:	Core.ports(),
				behavior	:	["INPUT","OUTPUT"],
				perClass	:	["LAMP", "SWITCH", "MIC", "LDR", "MOTOR", "OTHER"]
			},
			schedule : {
				schType 	:	["PERIODIC_TOGGLE", "PERIODIC_PULSE", "DATADE_TASK"],
				DATADE_TASK	: {
					change	:	["SET","CLEAR","TOGGLE"]
				}
			},
			trigger : {
				trigType	:	['SET', 'CLEAR', 'TOGGLE']
			}
		}
		res.send(JSON.stringify(obj))
	})
	
	router.get('/value', function (req,res){
		Core.change(req.query.pin, parseInt(req.query.value))
		res.end()
	})

}
