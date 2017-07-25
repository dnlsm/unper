const services = require('./services')

var database = require('./www/api/config/database')
var activateServices = [
		{id: 'api', name: 'API SERVER', path: 'www/api/apiServer', args: []},
		{id: 'http', name: 'HTTP SERVER', path: 'www/http/httpServer', args: []}
]

var func = services(activateServices)


const keyboard = require('./keyboard')

keyboard.onReadable(function (data){
	command = data.split(/\s+/)
	switch(command[0]){
		case '': break
		case 'db':
			console.log(database)
			break
		case 'dbs':
			console.log(database.stringify())
			break
		case 'password':
		case 'database':
		case 'user':
			if(command[1]){
				database[command[0]] = command[1]

				console.log('%s sucessful set to %s', command[0], database[command[0]])
			}
			break
		case 'exit':
			process.exit();
			break
		default:
			func(command);
	}
})
