const router = require('./router')
const url = require('url')
var connections = []

var devices = [{name: "LED", pin: 26, value: true},
				{name: "LAMPADA", pin: 19, value: false}]


var auths = {	'dnlsm': '1998',
				'eletro': '2016'}

var authorized = {}
var server = router(3000)

server.get('/devices', function(req, res){
		res.write(JSON.stringify(devices))
		res.end()
})

server.post('/devices', function(req, res){
		console.log('post')
		res.end()
})

server.put('/devices', function(req, res){
		console.log('put')
		res.end()
})

server.options('/devices', function(req, res){
	res.end()
})

server.get('/login', function (req, res){
	console.log(req.headers.origin)

	if (req.query){
		var q = req.query
		console.log(q)
		if (auths[q.user] && (auths[q.user] === q.pwd)){
			var id = "reqID=" + Math.random() * 65500;
			authorized[id] = true
			console.log(id)
			res.setHeader('Set-Cookie', id + ';path=/');
			res.statusCode = 200
			return res.end()
		}
		res.statusCode = 404
		return res.end()
	}
	else{
		res.statusCode = 404
		return res.end()
	}
})



server.interceptor(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin?req.headers.origin:'*')
		res.setHeader('Access-Control-Allow-Credentials', 'true')
		next()
})

server.interceptor(function(req, res, next){
		
		if (req.pathname === '/login') {
			next()
			return
		}
		else {
			var cookie = req.headers.cookie
			console.log(cookie)
			if (cookie && authorized[cookie]){

				next()
				return
			}
			res.end()
			return 'Error'
		}
})


