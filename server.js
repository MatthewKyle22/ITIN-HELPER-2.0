var express = require('express'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser= require('body-parser'),
    app = express(),
    cookieParser = require('cookie-parser'),
    jwt = require('jsonwebtoken'),
    mySpecialSecret = "Boom",
    port = process.env.PORT || 3000,
    apiRoutes = require('./routes'),
    User = require('./models/usersS')

    // app.user(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static(__dirname+'/public'))
    app.use(logger("dev"))
    app.use('/api', apiRoutes)

mongoose.connect('mongodb://localhost:27017/calendar')


    //creating new user through Admin login


app.listen(port)
