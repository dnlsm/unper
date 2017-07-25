var express = require('express')
var app = express()

var port = 3000

var cookieParser = require('cookie-parser')
var session = require('express-session')
var morgan = require('morgan')


var database = require('./config/database')


var mongoose = require('mongoose')


console.log("\n\nConnecting to: %s\n\n", database.stringify())
mongoose.connect(database.stringify())



app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({secret: 'string',
				 saveUninitiilized: true,
				 resave: true}))

app.use('/',function (req,res,next){
	console.log('new request')
	console.log('cookies:')
	console.log(req.cookies)
	console.log("---------------------------")
	console.log('session:')
	console.log(req.session)
	console.log("---------------------------")
	next()
})

require('./app/routes')(app)

app.listen(port, function(err){
	if (!err) 
		console.log("Server listen on port %s", port)
})
