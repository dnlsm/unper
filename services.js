const child_process = require('child_process')


createServices = function (services) {
	let switchFunc = "switch (command[0]){ \n"+
					"case 'start':\n"+
					"case 'restart':\n"+
					"case 'stop':\n"+
						"if (!command[1]) {	console.log('Please specify a service')\n"+
											"break}\n"+
						"switch (command[1]){\n"+
							"$ServicesCase\n"+
								"global[command[1]+'Service'][command[0]]()\n"+
								"break\n"+
							"default:\n"+
								"console.log('(%s) Service not found', command[1])\n"+
							"}\n"+
						"break\n"+
					"default:\n"+
						"console.log('Command \"%s\" not found', command[0])\n"+
				"}"
	services.forEach(function(service){
		let globalDescritor = service.id + 'Service'

		global[globalDescritor] = {}
		global[globalDescritor]['id'] = service.id
		global[globalDescritor]['name'] = service.name
		global[globalDescritor]['path'] = service.path

		global[globalDescritor]['process']
		global[globalDescritor]['start'] = function () { this.process = child_process.fork(this.path,[],[]) }
		global[globalDescritor]['stop']  = function () { this.process.kill() }
		global[globalDescritor]['restart']  = function () { this.stop()
															this.start() }
		switchFunc = switchFunc.replace('$ServicesCase', "case '"+service.id+"':\n$ServicesCase")
	})

	switchFunc = switchFunc.replace('$ServicesCase', '')
	var servicesFunc = Function('command', switchFunc )

	return servicesFunc
}

module.exports = createServices
