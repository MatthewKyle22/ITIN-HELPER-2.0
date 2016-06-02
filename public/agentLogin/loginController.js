angular.module('itinHelper')
    .controller('loginController', loginCtrl)
    // LOGIN CONTROLLER

loginCtrl.$inject = ["$http", "$state", "$window", "$rootScope", "$location", "auth", "authToken", "usersFactory"]

    function loginCtrl ($http, $state, $window, $rootScope, $location, auth, authToken, usersFactory) {
         var logCtrl = this
         logCtrl.newUser = {}
         logCtrl.page = 'Login'
         logCtrl.loggedIn = auth.isLoggedIn();
         if(logCtrl.loggedIn){
             $state.go('iBuilder')
         }

        logCtrl.signUp = function () {
            usersFactory.create(logCtrl.newUser)
                .then(function(res){
                    console.log(res)
                })
        }

        //create login method to send user info to server
        logCtrl.login = function() {
            auth.login(logCtrl.username, logCtrl.password)
            .then(function (res) {
                console.log('hellor')
                console.log(res)
                authToken.setToken(res.data.token);
                if(res.data.success){
                    $location.path('/')
                } else {
                    console.log(res.data.message)
                }
            })
        }


        // logCtrl.login = function () {
        //     $http.post('/login',{username: logCtrl.username, password: logCtrl.password})
        //     .then(function(response){
        //         console.log("from login route",response)
        //         var token = response.data.token
        //             if(token){
        //                 $window.localStorage.setItem('token',token)
        //                 $state.go('profile')
        //             } else {
        //                 console.log("no token found")
        //             }
        //         })
        //     }
        logCtrl.logout = function(){
            $window.localStorage.removeItem('token')
            $state.go('login')
            }
    }
