var mongoose = require("mongoose")
var bcrypt = require('bcryptjs')

//defining user schemas
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
  admin:    {
      type    : Boolean
  },
  email:    {
      type    : String,
      unique  : true,
    //   required: true
  },
  itineraries : []
})

var itinSchema = mongoose.Schema ({
    days: []
})


// middleware hashing PW
userSchema.pre('save', function(next){
    var user = this
    var hashPassword = bcrypt.hashSync(user.password, 8)
    user.password = hashPassword
    console.log('Encrypt PW')
    next()
})

// authenticating PW
userSchema.methods.matchUp = function(userPassword) {
    var user = this;
    return bcrypt.compareSync(userPassword, user.password);
}

module.exports = mongoose.model("User", userSchema)
