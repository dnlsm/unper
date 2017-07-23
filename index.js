const child_process = require('child_process')




var services = [
		{id: 'api', name: 'API SERVER', path: 'www/api/api'},
		{id: 'http', name: 'HTTP SERVER', path: 'www/http/httpServer'}
]


var switchFunc = "switch (command[0]){ \n"+
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
								"console.log('(%s) Service not found', command[1])"+
							"}\n"+
						"break"+
					"default:"+
						"console.log('Command \"%s\" not found', command[0])"+
				"}"

services.forEach(function(service){
	let globalDescritor = service.id + 'Service'

	global[globalDescritor] = {}
	global[globalDescritor]['id'] = service.id
	global[globalDescritor]['name'] = service.name
	global[globalDescritor]['path'] = service.path

	global[globalDescritor]['process']
	global[globalDescritor]['start'] = function () { this.process = child_process.fork('www/api/api',[],[]) }
	global[globalDescritor]['stop']  = function () { this.process.kill() }
	global[globalDescritor]['restart']  = function () { this.stop()
														this.start() }
	switchFunc = switchFunc.replace('$ServicesCase', "case '"+service.id+"':\n$ServicesCase")
})

switchFunc = switchFunc.replace('$ServicesCase', '')

console.log(switchFunc)


global.apiServ = {
			name: 'API SERVER',
			start: function(){
				this.process = child_process.fork('www/api/api',[],[])},
			stop: function(){
				this.process.kill()},
			restart: function(){
				this.stop();
				this.start();
			}}

global.httpServ = {
			name: 'HTTP SERVER',
			start: function(){
				this.process = child_process.fork('www/http/httpServer',[],[])},
			stop: function(){
				this.process.kill()},
			restart: function(){
				this.stop();
				this.start();
			}}


const keyboard = require('./keyboard')

var servicesFunc = Function('command',switchFunc )

keyboard.onReadable(function (data){
	command = data.split(/\s+/)
	switch(command[0]){
		case 'exit':
			process.exit();
			break
		default:
			servicesFunc(command);
	}
})
