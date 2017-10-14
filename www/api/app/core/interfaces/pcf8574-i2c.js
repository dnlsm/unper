var PCF8574 = require('pcf8574').PCF8574
const i2cBus0 = require('i2c-bus').openSync(1)
const i2cBus1 = require('i2c-bus').openSync(1)
const i2cBus2 = require('i2c-bus').openSync(1)

var addr0 = 0x20
var addr1 = 0x22
var addr2 = 0x24

var pcf0 = new PCF8574(i2cBus0, addr0, true)
var pcf1 = new PCF8574(i2cBus1, addr1, true)
var pcf2 = new PCF8574(i2cBus2, addr2, true)

var PCFs = [pcf0, pcf1, pcf2]
var pins = []


function writeFunc(data){
	console.log("%i writing to pin %s(%i)", data, this.name, this.pinNumber)
	console.log("(%i) before change", this.value)
	this.pcf.setPin(this.pinNumber, data)
	console.log("(%i) after change", this.value)
	this.value = data
}
function readFunc(){
	return this.pcf.getPinValue(this.pinNumber)
}

function eventHandler (data){
	console.log(data)
	pin = pins.find(function(element){
				return element.pinNumber === data.pin})
	console.log(data)
	pin.value = data.value
	if (pin && pin.trigger)
		pin.trigger(data, (data === 1)?(1):(0))
}

PCFs.forEach( function (pcf) { pcf.enableInterrupt (17) } )
PCFs.forEach(
	function (pcf) { pcf.on('input',
			function(data){
				pin = pins.find(function(element){
							return element.pinNumber === data.pin && element.pcf === pcf})
				var rising = (data.value === true)?(true):(false)
				if (pin && pin.trigger)
					pin.trigger.forEach(function(trigger){trigger.func.bind(pin)(data, rising, require)})
				
			})
	})


var j = -1;
PCFs.forEach(function (pcf) {
		j = j + 1; 
		for(let i = 0; i < 8 ; i++){			
			var el = {}
			el.name 	 = "PCF"+ j + "x" + i
			console.log(el.name)
			el.pinNumber = i
			el.pcf       = pcf
			el.write     = writeFunc
			el.read	 = readFunc
			el.trigger   = []
			el.value     = 1
			pins.push(el)
		}

})

function search(pinName, callback){
	var ret = pins.find(function (pin){
							return pinName === pin.name
						})
	if (callback){
		if (ret)	callback(null, ret)
		else 		callback("The pin "+ pinName + "could not be found")
	} 
	return ret
}

module.exports = {	pins : pins,
					search : search}
