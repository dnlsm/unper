const child_process = require('child_process')


var apiServerProcess = child_process.fork('www/api/apiServer',[],[])
var httpServerProcess = child_process.fork('www/http/httpServer',[],[])


const keyboard = require('./keyboard')

keyboard.onReadable(function (data){
	switch(data){
		case 'close':
			apiServerProcess.kill();
			break;
		case 'exit':
			process.exit()
		default:
	}
})