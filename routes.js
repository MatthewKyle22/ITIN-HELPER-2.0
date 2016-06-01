var router = require('express').Router(),
  userControl = require('./users')

router.route('/logIn')
    .post(userControl.userController.logIn)
router.route('/users')
    .post(userControl.userController.create)
    .get(userControl.userController.all)
router.route('/users/:id')
    .get(userControl.userController.single)
    .delete(userControl.userController.destroy)
    .put(userControl.userController.update)

router.use(function(req, res, next) {
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

})
module.exports = router
