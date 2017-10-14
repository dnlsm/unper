var activeTriggers = []
var activeSchedules = []


const Folder   		= require('../models/folder')
const Peripheral 		= require('../models/peripheral')
const Schedule 		= require('../models/schedule')
const Trigger  		= require('../models/trigger')
const I2C			= require('../core/interfaces/pcf8574-i2c')
const TrigFunc		= require('../core/template/triggerFunc')


/*Trigger.create({
	'trigType'	:     'TOGGLE',
	'source'	:	"59c596963f02b607fa09c134",
	'target'	:	"59c596963f02b607fa09c137",
	'delay'	:	500,
	'onRising' :	true
})
/*

Peripheral.create({
	perName : "Interruptor0",
	behavior : "INPUT",
	port : "PCF1x0",
	perClass : "SWITCH"
})
Peripheral.create({
	perName : "Interruptor1",
	behavior : "INPUT",
	port : "PCF1x1",
	perClass : "SWITCH"
})
Peripheral.create({
	perName : "Interruptor2",
	behavior : "INPUT",
	port : "PCF1x2",
	perClass : "SWITCH"
})
Peripheral.create({
	perName : "Interruptor3",
	behavior : "INPUT",
	port : "PCF1x3",
	perClass : "SWITCH"
})
Peripheral.create({
	perName : "Interruptor4",
	behavior : "INPUT",
	port : "PCF1x4",
	perClass : "SWITCH"
})
Peripheral.create({
	perName : "Interruptor5",
	behavior : "INPUT",
	port : "PCF1x5",
	perClass : "SWITCH"
})

Peripheral.create({
	perName : "Interruptor6",
	behavior : "INPUT",
	port : "PCF1x6",
	perClass : "SWITCH"
})
///////////////////////////////////////
Peripheral.create({
	perName : "LED0",
	behavior : "OUTPUT",
	port : "PCF0x0",
	perClass : "LAMP"
})
Peripheral.create({
	perName : "LED1",
	behavior : "OUTPUT",
	port : "PCF0x1",
	perClass : "LAMP"
})
Peripheral.create({
	perName : "LED2",
	behavior : "OUTPUT",
	port : "PCF0x2",
	perClass : "LAMP"
})
Peripheral.create({
	perName : "LED3",
	behavior : "OUTPUT",
	port : "PCF0x3",
	perClass : "LAMP"
})
Peripheral.create({
	perName : "LED4",
	behavior : "OUTPUT",
	port : "PCF0x4",
	perClass : "LAMP"
})
Peripheral.create({
	perName : "LED5",
	behavior : "OUTPUT",
	port : "PCF0x5",
	perClass : "LAMP"
})

Peripheral.create({
	perName : "LED6",
	behavior : "OUTPUT",
	port : "PCF0x6",
	perClass : "LAMP"
})
Peripheral.create({
	perName : "LED7",
	behavior : "OUTPUT",
	port : "PCF0x7",
	perClass : "LAMP"
})
*/

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
// -Include the trigger to the activeTriggers Array
// -Initialize the trigger functions
function initTrigger(trigger){
	Peripheral.findOne({_id : trigger.source})
	.exec(function(err, sourcePer){
			if (err) console.log("Erro Periferico1")
			if (sourcePer) {
				Peripheral.findOne({_id : trigger.target})
				.exec(function (err, targetPer) {
					if (err) console.log("Erro Periferico2")
					//console.log(sourcePer,targetPer)
					if (targetPer) {
						I2C.search(sourcePer.port).trigger.push(
							{
								_id:  trigger._id,
								func:	 new Function ( 'data', 'isRising', 'require',
										TrigFunc(	'pcf8574-i2c',
												targetPer.port,
												trigger.trigType,
												trigger.delay,
												trigger.onRising)
											)
							}
						)
						var activeTrigger = {
							_id		: trigger._id,
							source	: sourcePer.perName,
							idSource	: sourcePer._id,
							target	: targetPer.perName,
							idTargert	: targetPer._id,
							type		: trigger.trigType
						}
						activeTriggers.push(activeTrigger)
					}
				})
			}
	})
}


function addTrigger(trig){
	Trigger.create(trig,
	function (err, trigger){
		if (err) return console.log(err)
		initTrigger(trigger)
	})
}

function remTrigger(trig, callback){
	var triggerId = '';
	if (typeof trig === 'string')
			triggerId = trig
	if (typeof trig === 'object')
			triggerId = trig._id
			
	Trigger.findById (triggerId, function (err, trigger){
				if (err)
					if (callback)
						return callback(err)
				for (let i = 0; i < activeTriggers.length; i++){
					if (activeTriggers[i]._id === triggerId){
						activeTriggers.splice(i, 1)
						break
					}
				}
				Peripheral.findById(trigger.source, function (err, sourcePer){
					I2C.search(sourcePer.port, function(err, pin){
							if (err)
								if (callback)
									return callback(err)
									
							for (let i = 0; i < pin.trigger.length; i++){
								if (pin.trigger[i]._id === triggerId){
									pin.trigger(i, 1)
									break
								}
							}
							Trigger.removeById(triggerId, function(err){
									if (err) return console.log(err)
								}
							)
							if (callback)
								return callback (undefined)
					})
				})
	})	
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
// -Include the trigger to the active Array

function addSchedule(schedule){
	
}


function remSchedule(schedule){
	
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
// -
// -
function initPeripheral(peripheral){
		I2C.search(peripheral.port, function (err, pin){
				if (err)	return (err)
				console.log(pin)
				if (peripheral.behavior === "INPUT")
					pin.pcf.inputPin(pin.pinNumber, false)
				if (peripheral.behavior === "OUTPUT")
					pin.pcf.outputPin(pin.pinNumber, false, true)
		})
}

function addPeripheral(perif){
	Peripheral.create(perif,
	function (err, peripheral){
		if (err) return console.log(err)
		initPeripheral(peripheral)
	})
}

function remPeripheral(perif){
	var peripheralId = '';
	
	if (typeof perif === 'string')
			peripheralId = perif
	if (typeof perif === 'object')
			peripheralId = perif._id
	
 	for (let i = 0; i < activeTriggers.length; i++){
		if (activeTriggers[i].source === peripheralId || activeTriggers[i].target === peripheralId ){
			remTrigger(activeTriggers[i]._id)
			i -=1
		}
	}
	for (let i = 0; i < activeSchedules.length; i++){
		if (activeSchedules[i].target === peripheralId ){
			remSchedule(activeSchedules[i]._id)
			i -=1
		}
	}
	Peripheral.removeById(peripheralId, function (err){
		if (err) return console.log(err)
	})
}




//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////
// Initializee Peripherals
	var peripheralCursor = Peripheral.find({}).cursor()
	peripheralCursor.on('data',
		function (peripheral){
			initPeripheral(peripheral)
		}
	)
	peripheralCursor.on('exit',
		function () {
			console.log("All Peripherals Initialized")
		}
	)
//////////////////////
// Initialize Triggers
	var triggerCursor = Trigger.find({}).cursor()
	triggerCursor.on('data',
		function (trigger){
			initTrigger(trigger)
		}
	)
	triggerCursor.on('exit',
		function () {
			console.log("All Triggers Initialized")
		}
	)



//////////////////////
// Initialize Schedules	
	var scheduleCursor = Schedule.find({}).cursor()


function change(pin, val){
	console.log("Searching For pin %s to val %i",pin,val)
	I2C.search(pin,function(err, ret){
		if (err !== null) return Console.log("ERRO")
		ret.write(val)
	})
}

function ports() {
	ports = []

	I2C.pins.forEach(function (pin) {ports.push (pin.name)})
	return ports
}
	module.exports = {
			addTrigger 		:	addTrigger,
			addSchedule		:	addSchedule,
			addPeripheral	:	addPeripheral,
			remTrigger 		:	remTrigger,
			remSchedule		:	remSchedule,
			remPeripheral	:	remPeripheral,
			change		:	change,
			ports			:	ports

	}
