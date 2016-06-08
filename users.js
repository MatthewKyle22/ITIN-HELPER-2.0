var User = require("./models/usersS");
var jwt = require('jsonwebtoken');
var mySpecialSecret = "Boom";
var Itinerary = require('./models/itineraryS')

function deleteAll() {
    Itinerary.find({}, function(err, itins) {

        itins.forEach(function(itin){

            Itinerary.remove(itin, function (err) {
              if (err) return handleError(err);
              // removed!
            });
        })
    })

    User.find({}, function(err, users) {
        users.forEach(function(user){
            user.itineraries = [];
            user.save();
        })
    })

}
//
// deleteAll()

module.exports = {
    userController: {
        addItin: function(req, res) {
            User.findById(req.decoded._id, function(err, user){
                if(err) {
                    return res.json(err)
                } else {
                    console.log(user)
                    var body = req.body.itinerary
                    var itin = new Itinerary({
                        day       : body.day,
                        breakfast : body.breakfast,
                        morning   : body.morning,
                        lunch     : body.lunch,
                        afternoon : body.afternoon,
                        dinner    : body.dinner,
                        evening   : body.evening,
                        user      : user._id
                    })
                    itin.save(function(err){
                        user.itineraries.push(itin._id)
                        user.save(function(){
                            res.json(user)
                        })
                    })
                }
            })



        //     var itin = req.body.itinerary
        //     User.findByIdAndUpdate(req.decoded._id, {
        //         $push: {
        //             'itineraries': req.body.itinerary
        //         }
        //     }, {
        //         new: true
        //     }, function(err, user){
        //         if(err) {
        //             res.json(err)
        //         } else {
        //             res.json(user)
        //         }
        //     })
        },
        showItin: function(req, res) {
            var userid = req.decoded._id
            console.log(req.decoded._id);
            //fix
            Itinerary.find({}).populate('user').exec(function(err, itins){
                if(err){
                    res.json(err)
                } else {
                    res.json(itins)
                }
            })
            return
            User.findById(userid).populate().exec(function(err, user){
                if(err){
                    res.json(err)
                } else {
                    res.json(user)
                    // res.json(user.itineraries)
                }
            })
        },

        create: function(req, res) {
            var user = new User(req.body)
            user.save(function(err, user){
                if(err) {
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
        },
        logIn: function (req, res) {
            User.findOne({username: req.body.username},
            function(err, user){
                if(err) {
                    res.json(err)
                }
                if (user) {
                    if(user.matchUp(req.body.password)) {
                        var token = jwt.sign({username: user.username, _id: user._id, token: user.token},
                            mySpecialSecret,
                            {expiresIn: "8h"});
                    res.json({
                        success: true,
                        message: "You Logged In!",
                        token: token
                    })
                    }
                } else {
                    res.json({message: "User Does Not Exist"})
                }
            })
        },
        update: function(req, res) {
            User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
            function(err, user){
                if(err) {
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
        },
        all: function(req, res){
            console.log(req.decoded);
            User.find({}).populate('itineraries').exec(function(err, users){
               if(err) {
                   res.json(err)
               } else {
                   res.json(users)
               }
           })
        },
        //added populate & exec
        single: function(req, res){
            User.findOne({_id: req.params.id},
            function(err, user){
                if(err) {
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
        },
        destroy: function(req, res){
            User.remove({_id: req.params.id}, function(err, user){
                if(err) {
                    res.json(err)
                } else {
                    res.json({message: "User Deleted", id: req.params.id})
                }
            })
        },
        getUserItineraries: function(req, res) {
            User.findById().populate('itineraries').exec()
        },
        getItinerary: function(req, res) {
           Itinerary.find({}).populate('user').exec()
       },
       getItineraryBy:function(reg, res) {

           res.body === {
               key: 'breakfast',
               value: 'ohana'
           }



           var filter = {};
           filter[req.body.key] = req.body.value;


           Itinerary.find(filter, function(){

           })



           // from the user
           User.findById().populate('itineraries').exec(function(err, user) {

               user.itineraries = user.itineraries.find(function(iten) {
                   return iten[req.body.key] === req.body.value;
               })

               res.json(user);
           })
       }
   }
}
