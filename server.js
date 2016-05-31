var express = require('express'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser= require('body-parser'),
    app = express(),
    cookieParser = require('cookie-parser'),
    jwt = require('jsonwebtoken'),
    mySpecialSecret = "Boom",
    port = process.env.PORT || 3000,
    apiRoutes = require('./routes')


    // app.user(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static(__dirname+'/public'))
    app.use(logger("dev"))

mongoose.connect('mongodb://localhost:27017/calendar')

    app.listen(port)
