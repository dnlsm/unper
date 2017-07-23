const services = require('./services')

var activateServices = [
		{id: 'api', name: 'API SERVER', path: 'www/api/apiServer'},
		{id: 'http', name: 'HTTP SERVER', path: 'www/http/httpServer'}
]

var func = services(activateServices)

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



keyboard.onReadable(function (data){
	command = data.split(/\s+/)
	switch(command[0]){
		case 'exit':
			process.exit();
			break
		default:
			func(command);
	}
})
