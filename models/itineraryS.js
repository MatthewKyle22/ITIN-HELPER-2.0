var mongoose = require('mongoose'),
      Schema = require('mongoose').Schema,

itinSchema = new Schema({
    day       : String,
    breakfast : String,
    morning   : String,
    lunch     : String,
    afternoon : String,
    dinner    : String,
    evening   : String,
    user      : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Itinerary', itinSchema);
