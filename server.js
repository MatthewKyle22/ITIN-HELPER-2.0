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



    //creating new user through Admin login
    app.post('/createNewUser', function(req, res) {
            var user = new User(req.body)
            console.log('Before save-------------------')
        user.save(function(err, user) {
            if (err) {
                res.json(err)
            } else {
                console.log('After save-------------------')

                res.json(user)
            }
        })
    })

    //login function
    app.post('/login', function(req, res) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) {
                res.json(err)
            } else if (user) {
                if (user.authenticate(req.body.password)) {
                    var token = jwt.sign({
                        name: user.username
                    }, mySpecialSecret, {
                        expiresIn: 1440
                    })
                    // 4 - Send back a success message with the JWT
                    res.json({
                        success: true,
                        message: 'YOU get a token!',
                        token: token
                    })

                } else {
                    res.json({
                        message: "Your password does not match!",
                        success: false
                    })
                }
                } else {
                    res.json({
                        message: "Could not find user: " + req.body.username,
                        success: false
                    })
                }
            })
    })


    function authorize(req, res, next) {
        var token = req.body.token || req.param('token') || req.headers['x-access-token']
        console.log("token from client", token);
        if (token) {
            jwt.verify(token, mySpecialSecret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: "can't authenticate token"
                    })
        //  - if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {

    // 3 - If we can't find a token at all, we'll just send back an error message
            return res.status(403).send({
                success: false,
                message: "no token provided"
            })
        }

    }
