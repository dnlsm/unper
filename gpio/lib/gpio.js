const fs = require('fs')
const io = require('./io')
const prototype = require('./prototype')



var createGpio = function (pin, dir) {

	var product = io.exportPin(pin)
	if (product){

		for (var prop in prototype)
			product[prop] = prototype[prop]

		if (product.setDir(dir)){
			return product
		}
		return product
	}
	console.log('error')
	return undefined
}

module.exports = createGpio;
