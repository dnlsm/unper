const express = require('express')
const fs = require('fs')
const app = express()
const os = require('os')


const gpioPath = '/sys/class/gpio/'


/*

	Information about the initilizing

*/

const port = 80;



if (os.platform() == 'linux')	var projectDir = '/home/raspberry/WebServer/'
else
if (os.platform() == 'win32')	var projectDir = 'C:\\Users\\Danilo\\Google Drive\\Unper\\3-Implementação\\unper\\'

const htdocsDir = 'htdocs'




const htdocsPath = projectDir +  htdocsDir + "/";

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
				console.log("Arquivo não encontrado: "+ filePath)
				res.writeHead(404)
			}
			else{
				console.log("Arquivo encontrado: "+ filePath)
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



app.get('/test', (req, res, next)=>{
	res.sen
	next()

}, finalize)


app.use(express.static(htdocsPath+"/styles"));

app.get('*.js',(req, res, next) => {
	res.contentType('text/javascript')
	next()
}, [getFile, finalize])

app.get('/styles/*',(req, res, next) => {
	res.contentType('text/css')
	next()
}, [getFile, finalize])

app.get('*.png', [getFile, finalize])
app.get('*.html', [getFile, finalize])



app.get('/gpio/*', (req, res) =>{
	fs.appendFile(
				gpioPath + 'export',
				req.query.pin.toString(), 
				(err) => {if (err) console.log(err)})

	var pinPath = gpioPath + 'gpio'+ req.query.pin + '/';

	fs.appendFile(pinPath + 'direction',
				  'out',
				(err) => {if (err) console.log(err)}) 
	fs.appendFile(
					pinPath + 'value',
					req.query.value,
					(err) => {if (err) console.log(err)})
	res.end('Pin '+req.query.pin + ' = ' + req.query.value)
})


console.log("oi")

app.listen(port, (err) => {
	if(err){
		return console.log('An erro occurred while starting server at port ${port}')
	}

	console.log('Sucessfull initialization. Listen at port %s', port)
})
