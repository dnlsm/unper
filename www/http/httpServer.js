const express = require('express')
const fs = require('fs')



const app = express()
const config = require('./config')


var htdocsPath = config.projectDir +  config.htdocsDir + "/";

app.get("/", (req, res)=>{
	res.writeHead(200, {'content-type':'text/html'})
    filePath =  htdocsPath + "index.html"
	fileStream = fs.readFileSync(filePath)
	res.write(fileStream)
	res.end();
})


var getFile  = function (req, res, next){
	filePath =  htdocsPath + req.url
	fs.stat(filePath, (err, stats) => {
			if (err){
				console.log("404: "+ req.url)
				res.writeHead(404)
			}
			else{
				console.log("200: "+ req.url)
				fileStream = fs.readFileSync(filePath)
				res.writeHead(200)
				res.write(fileStream)
			}
			next()
		}
	)
}

var finalize = function (req, res){
	res.end();
}
app.use('/', function(req,res,next){
	console.log(req.url)
	next()
})

app.use('/res',express.static(htdocsPath+"/res"))
app.use('/styles',express.static(htdocsPath+"/styles"))
app.use('/lib',express.static(htdocsPath+"/lib"))
app.use('/js',express.static(htdocsPath+"/js"))
app.use('/',express.static(htdocsPath+"/"))

app.listen(config.port, (err) => {
	if(err){
		return console.log('An erro occurred while starting HTTP server at port ${port}')
	}

	console.log('HTTP server listen at port %s', config.port)
})
