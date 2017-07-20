const io = require('./io')

exports.isExported = function () {
	try {
		fs.statSync(this.path)
		return true
	}
	catch(err){
		return false
	}
}

exports.setDir = function (dir) {
		if (this.isExported()){
			try {
					console.log("this = "+this)
					fs.writeFileSync(this.dirFile, dir)
					this.dir = dir
					if (dir == 'out' || dir == 'high' || dir == 'low') {
						this.read = io.read
						this.write = io.write
					}
					else if (dir == 'in'){
						delete this.write

						this.read = io.read
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
