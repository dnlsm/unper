const http = require('http')
const url = require('url')
var createServer = function (port){
		var extern = {}

		var interceptors = []
		var methods = ['GET', 'POST', 'OPTIONS', 'PUT']
		var routes = {}	


		methods.forEach(function (method){
				routes[method] = {}
				extern[method.toLowerCase()] = function(url, callback){
					routes[method][url] = callback
				}
			}
		)
		

		extern.interceptor = function(interceptor){
			interceptors.push(interceptor)
		}

		var executeInterceptors = function (num, req, res, callback){
			if (!interceptors[num]) return callback()

			var next = false;
			var returnParam = interceptors[num](req, res, function() {
					next = true;
			})

			if (next) 	executeInterceptors (++num, req, res, callback)
			else		callback(returnParam)
		}

		var bodyParser = function (req, res, next){
				var body = []


				req.on('data', function (data){
						body.push(data)
				})


				req.on('end', function(){
						req.body = Buffer.concat(body).toString()
						next()
				})
		}

		var parseUrl = function (req){
			urlParse = url.parse(req.url)
			for (var param in url.parse(req.url)) 
				if (!req[param]) req[param] = urlParse[param]
		}

		var splitQuery = function (req){
			if(!req.query) {			
				return
			}
			
			var query = req.query
			req.query = {}
			query = query.split('&')
			query.forEach(function (q) {
				var param = q.split('=')
				req.query[param[0]] = param[1]
			})

		}
		var server  = http.createServer(function (req, res) {
			parseUrl(req)
			splitQuery(req)

			bodyParser(req, res, function (){
				executeInterceptors(0, req, res, function (err) {
					if (err) return
					if (!routes[req.method][req.pathname]) {
							res.statusCode = 401;
							return res.end()
						}
					routes[req.method][req.pathname](req, res)
				})

			})
		})

		server.listen(port, function () {
			console.log("Api server started at port %s", port)
		})
		server.on('close',function(){
			console.log('Server closed')
		})


		return extern
}

module.exports = createServer


