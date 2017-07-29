var express = require('express')
var app = express()

var port = 3000

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var morgan = require('morgan')
var database = require('./config/database')
var mongoose = require('mongoose')
var passport = require('passport')

mongoose.connect('mongodb://localhost:27017/Unper')



app.use(function(req,res, next){
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin?req.headers.origin:'*')
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	next()
})

app.use(morgan('dev'))
app.use(bodyParser())
app.use("/login",function(req,res,next){
	console.log('Interceptor:')
	console.log(req.body)
	next()
})
app.use(cookieParser())
app.use(session({secret: 'string',
				 saveUninitiilized: true,
				 resave: true}))
app.options('/login',function(req,res){
	console.log('123 OPTIONS')
	res.end()
})
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

require('./app/routes')(app, passport)

app.listen(port, function(err){
	if (!err) 
		console.log("Server listen on port %s", port)
})
