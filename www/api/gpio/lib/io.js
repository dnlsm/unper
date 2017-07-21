const gpioPath = '/sys/class/gpio/'

exports.write = function (value, callback){
	try{
			fs.writeFileSync(this.valueFile, value)
	}
	catch(err){
		if (callback) callback(err)
	}
	if (callback) callback(undefined)
}
	
exports.read = function (callback) {
	try{
		return value = fs.readFileSync(this.valueFile).toString()
	}

	catch(err){
		if (callbakc) callback(err, undefined)
	}

	if (callback) callback(undefined,value)
}

exports.exportPin = function (pin) {
	var pinPath = gpioPath + 'gpio' + pin + '/'
	try {
			var stat = fs.statSync(pinPath)
	}
	catch (err){
			try {
					fs.writeFileSync(gpioPath + 'export', pin)
			}
			catch (err){
					return false
			}
	}
	let obj = {}
	obj.pin = pin
	obj.path = pinPath
	obj.dirFile = obj.path + 'direction'
	obj.valueFile = obj.path + 'value'
	return obj
}
