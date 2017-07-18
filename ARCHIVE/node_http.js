const http = require('http')
const express = require('express')
const port = 80

const projectDir = 'C:\\Users\\Danilo\\Google Drive\\Unper\\3-Implementação\\WebServer'
const htdocsDir = 'htdocs'

var fs = require('fs')
var index = fs.readFileSync(__dirname + '/htdocs/index.html')

console.log("Inicializando Handlers")

const requestHandler = (req, res) => {
	var reqFilePath = req.url;
	console.log(reqFilePath)
	fullFilePath = projectDir + "//"+ htdocsDir +"//"+ reqFilePath
		fs.stat(fullFilePath,
			(err, stats) => {
				if (err){
					console.log("Arquivo não encontrado: "+ reqFilePath)
					res.writeHead(404)
					res.end("Erro 404")
				}
				else{
					if (stats.isFile()) {
						console.log("Arquivo encontrado: "+ reqFilePath)
						file = fs.readFileSync(fullFilePath)
						//res.writeHead(200, {'content-type': 'text/html'})
						res.write(file)
						res.end()
					}
					else {
						console.log("Diretorio")
						res.writeHead(200, {'content-type':'text/html'})
						res.write(index)
						res.end()
					}
				}


			}
		)
}


const errorHandler = (err) => {
	if(err){
		console.log('Erro ao inicializar o servidor')
	}
	console.log('Inicializado');
}


console.log("Criando servidor")
server = http.createServer(requestHandler, errorHandler)

console.log("Iniciando escuta")
server.listen (port , errorHandler)