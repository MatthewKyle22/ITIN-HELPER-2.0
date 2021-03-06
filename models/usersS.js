var mongoose = require("mongoose")
var bcrypt = require('bcryptjs')
    require('./itineraryS')

//user schemas
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
  itineraries : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary"
  }]
})


//Itineraries Schema
// var itinSchema = mongoose.Schema ({
//     days: []
// })


// middleware hashing PW
userSchema.pre('save', function(next){
    var user = this
    if(!this.isModified("password")){
        return next();
    }
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
// modlue.exports = mongoose.model("Itinerary", itinSchema)
module.exports = mongoose.model("User", userSchema)
