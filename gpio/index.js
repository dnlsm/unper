const fs = require('fs')
const gpioPath = '/sys/class/gpio/'

var createGpio = function (pin, dir) {

	var constructor = this
	

	var writeFunc = function (value, callback) {
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
	

	var readFunc = function(callback) {
		try{
			var value = fs.readFileSync(this.valueFile).toString()
			this.value = value
		}

		catch(err){
			if (callbakc) callback(err, undefined)
		}

		if (callback) callback(undefined,value)
	}



	var setDirFunc = function (dir) {
		if (isExported()){
			try {
					fs.writeFileSync(self.dirFile, dir)
					this.dir = dir
					if (dir == 'out' || dir == 'high' || dir == 'low') {
						delete this.read
						this.write = contructor.writeFunc

					}
					else if (dir == 'in'){
						delete this.write
						this.read = constructor.readFunc
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



	var isExportedFunc = function() {
		try {
			fs.statSync(this.path)
			return true
		}
		catch(err){
			return false
		}
	}



	var exportPin = function (obj, setDirFunction) {
		var pinPath = gpioPath + 'gpio' + obj.num + '/'

		try {
				var stat = fs.statSync(pinPath)				
				console.log('Pin exported')
		}
		catch (err){
				try {
						fs.writeFileSync(gpioPath + 'export', obj.num)
				}
				catch (err){
						console.log(err)
						return false
				}
		}
		obj.path = pinPath
		obj.dirFile = obj.path + 'direction'
		obj.valueFile = obj.path + 'value'
		obj.setDir = setDirFunction
		return true
	}


	var product = {pin:pin}
	if (exportPin(product, setDirFunc)){
		if (product.setDir(dir)){
			return product
		}
	}
	return undefined
}

module.exports = createGpio;