var mongoose = require('mongoose'),
      Schema = require('mongoose').Schema,

itinSchema = new Schema({
    day       : String,
    breakfast : String,
    morning   : String,
    lunch     : String,
    afternoon : String,
    dinner    : String,
    evening   : String
})

module.exports = mongoose.model('Itinerary', itinSchema);
