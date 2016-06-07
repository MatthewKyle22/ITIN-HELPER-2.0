var User = require("./models");
var jwt = require('jsonwebtoken');
var mySpecialSecret = "Boom";


module.exports = {
    userController: {
        addItin: function(req, res) {
            var itin = req.body.itinerary
            User.findByIdAndUpdate(req.decoded._id, {
                $push: {
                    'itineraries': req.body.itinerary
                }
            }, {
                new: true
            }, function(err, user){
                if(err) {
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
        },
        showItin: function(req, res) {
            var userid = req.decoded._id
            User.findById(userid).populate('itineraries').exec(function(err, user){
                if(err){
                    res.json(err)
                } else {
                    res.json(user.itineraries)
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
            User.find({}, function(err, users){
                if(err) {
                    res.json(err)
                } else {
                    res.json(users)
                }
            })
        },
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
        }
    }
}
