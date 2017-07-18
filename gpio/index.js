const fs = require('fs')
const gpioPath = '/sys/class/gpio/'

var createGpio = function (pin, dir) {

	const constructor = this
	

	function writeFunc(value, callback) {
		try{
				fs.writeFileSync(this.valueFile, value)
				console.log("%s was written to  pin %s", self.value, self.num)
				this.value = value
		}
		catch(err){
			if (callback) callback(err)
		}

		if (callback) callback(undefined)
	}
	

	function readFunc(callback) {
		try{
			var value = fs.readFileSync(this.valueFile).toString()
			this.value = value
			return value
		}

		catch(err){
			if (callbakc) callback(err, undefined)
		}

		if (callback) callback(undefined,value)
	}

	function isExportedFunc() {
		try {
			fs.statSync(this.path)
			return true
		}
		catch(err){
			return false
		}
	}

	function setDirFunc (dir) {
		if (this.isExported()){
			try {
					fs.writeFileSync(this.dirFile, dir)
					this.dir = dir
					if (dir == 'out' || dir == 'high' || dir == 'low') {
						this.read = this.readFunc
						this.write = this.writeFunc
					}
					else if (dir == 'in'){
						delete this.write

						this.read = this.readFunc
					}
					return true
			}
			catch (err){
					console.log('Gpio pin setDir write error:')
					console.log(err)
					return false
			}
		}
		else{
			console.log('Gpio pin not initialized!')
		}
	}

	var exportPin = function (obj, setDirFunction) {
		var pinPath = gpioPath + 'gpio' + obj.pin + '/'
		try {
				var stat = fs.statSync(pinPath)				
				console.log('Pin %s exported', obj.pin)
		}
		catch (err){
				try {
						fs.writeFileSync(gpioPath + 'export', obj.pin)
				}
				catch (err){
						return false
				}
		}
		obj.path = pinPath
		obj.dirFile = obj.path + 'direction'
		obj.valueFile = obj.path + 'value'
		obj.setDir = setDirFunction
		return true
	}


	let product = {	pin:pin,
					writeFunc: writeFunc,
					readFunc: readFunc}
	if (exportPin(product, setDirFunc)){
		product.isExported = isExportedFunc
		if (product.setDir(dir)){
			return product
		}
		return product
	}
	return undefined
}

module.exports = createGpio;
