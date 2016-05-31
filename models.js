var mongoose = require("mongoose")
var bcrypt = require('bcryptjs')

var userSchema = mongoose.Schema({
  username: {
      type    : String,
      unique  : true,
      required: true
  },
  password: {
      type    : String,
      required: true
  },
  admin: {
      type    : Boolean
  },
  email: {
      type    : String,
      unique  : true,
      required: true
  }
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

module.exports = mongoose.model("user", userSchema)
