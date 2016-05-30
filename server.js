var express = require('express'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser= require('body-parser'),
    app = express(),
    cookieParser = require('cookie-parser'),
    jwt = require('jsonwebtoken'),
    mySpecialSecret = "Boom",
    port = process.env.PORT || 3000
    // apiRoutes = require('./routes')

mongoose.connect('mongodb://localhost:27017/calendar')

    // app.user(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static(__dirname+'/public'))
    app.use(logger("dev"))

// imporing brcryptjs module
var bcrypt = require('bcryptjs')
var userSchema = mongoose.Schema({
  username: {
      type: String,
      unique: true
  },
  password: String
})

// middleware
userSchema.pre('save', function(next){
  var user = this
  var hashPassword = bcrypt.hashSync(user.password, 8)
  user.password = hashPassword
  console.log('Encrypt PW')
  next()
})

userSchema.methods.authenticate = function(userPassword) {
  var user = this
  return bcrypt.compareSync(userPassword, user.password)
}

var User = mongoose.model('User', userSchema)



    app.listen(port)
