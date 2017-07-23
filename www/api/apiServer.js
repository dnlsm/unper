var express = require('express')
var app = express()
var port = 3000

var morgan = require('morgan')

app.use(morgan('dev'))

app.use('/',function (req,res){
	res.send('Site')
})

app.listen(port, function(err){
	if (!err) 
		console.log("Server listen on port %s", port)
})
