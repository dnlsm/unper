const child_process = require('child_process')


var apiServerProcess = {}
var httpServerProcess = {}


const keyboard = require('./keyboard')



keyboard.onReadable(function (data){
	command = data.split(/\s+/)
	switch(command[0]){
		case 'start':
			if (!command[1]) break
			switch (command[1].toLowerCase()){
				case 'api':
					apiServerProcess = child_process.fork('www/api/apiServer',[],[])
					break
				case 'http':
					httpServerProcess = child_process.fork('www/http/httpServer',[],[])
					break
				default:
					console.log('Specify a valid module')
			}
			break
		case 'restart':
			if (!command[1]) break
			switch (command[1].toLowerCase()){
				case 'http':
					console.log('Restarting HTTP server')
					httpServerProcess.kill();
					httpServerProcess = child_process.fork('www/http/httpServer',[],[])
					break
				case 'api':
					console.log('Restarting API server')
					apiServerProcess.kill()
					apiServerProcess = child_process.fork('www/api/apiServer',[],[])
					break
				default:
					console.log('Specify a valid module')
			}
			break
		case 'stop':
			if (!command[1]) break
			switch (command[1].toLowerCase()){
				case 'api':
					apiServerProcess.kill()
					break
				case 'http':
					httpServerProcess.kill()
					break
				default:
					console.log('Specify a valid module')
			}
			break
		case 'exit':
			process.exit()
		default:
	}
})
