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


mongoose.connect('mongodb://localhost:27017/Unper', function (err){
	var core = require('./app/core')
	if (err) return console.log(err)

	// Seta header padrão do CORS
	app.use(function(req,res, next){
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin?req.headers.origin:'*')
		res.setHeader('Access-Control-Allow-Credentials', 'true')
		next()
	})


	// Middlewares

	app.use(bodyParser.urlencoded ({ extended:true}))

	app.use(function (req,res,next){
		console.log(req.body)
		next()
	})
	
	app.use(bodyParser.json())
	app.use(morgan('dev'))

	app.use(cookieParser())


	app.use(session({secret: 'string',
					 saveUninitiilized: true,
					 resave: true}))

	app.use(passport.initialize())
	app.use(passport.session())

	// inicializa passport
	require('./config/passport')(passport)

	// inicializa rota de autenticação
	var auth = express.Router()
	require('./app/routes/auth')(auth, passport)
	app.use('/auth',auth)

	// inicializa rota da api
	var api = express.Router()
	require('./app/routes/api')(api, passport)
	app.use('/', api)

	
	// inicia escuta do servidor
	app.listen(port, function(err){
		if (!err) 
			console.log("Server listen on port %s", port)
	})
})
