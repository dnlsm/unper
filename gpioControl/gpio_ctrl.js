const fs = require('fs')
const gpioPath = '/sys/class/gpio/'




function Gpio (pinNum, dir) {
	self = this
	self.num = pinNum
	self.exportPin(() => {
		console.log('constructor:'+ JSON.stringify(self))
		self.setDir(dir)
	})
}


Gpio.prototype.write = function (value, callback) {
	var self = this
	if (self.exported == true && self.dir == 'out'){
		fs.appendFile (self.valueFile, value, (err) => {
			if (err) throw err
			console.log("%s was written to  pin %s", self.value, self.num)
			self.value = value
		})
	}
	if (callback) callback()
}


Gpio.prototype.setDir = function (dir) {
	var self = this
	console.log('setDir:'+JSON.stringify(self))
	console.log('(%s)self.exported: '+ self.exported, self)
	if (self.exported == true){
		fs.appendFile(self.dirFile, dir, (err) => {
			if (err) throw err
			self.dir = dir
		})
	}
	else{
		console.log('Gpio pin is not exported yet!')
	}
}


Gpio.prototype.exportPin = function (callback) {
	var self = this
	pinPath = gpioPath + 'gpio' + self.num + '/'
	fs.stat(pinPath, (err, stats) => {
		if (err) {
			fs.appendFile(gpioPath + 'export', self.num , (err) => {
					if (err) {
						self.exported = false
					}
				})
		}
		else{

		console.log('Pin exported')
		self.exported = true
		self.path = gpioPath + 'gpio' + self.num + '/'
		self.dirFile = self.path + 'direction'
		self.valueFile = self.path + 'value'

		console.log('export:'+JSON.stringify(self))
		console.log('calling callback function')
		callback()
	})
}

module.exports = Gpio
