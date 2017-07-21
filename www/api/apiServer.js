const http = require('http')
const port = 3000


var mongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:3001/unper'

mongoClient.connect(url, function (err,db){
	if (err) throw err
	console.log(db)
})
var connections = []


var server  = http.createServer(function (req, res) {
	res.write('HI')
	res.end()
})

server.listen(port, function () {
	console.log("Api server started at port %s", port)
})
server.on('close',function(){
	console.log('Server closed')
})




global.apiServer = server

