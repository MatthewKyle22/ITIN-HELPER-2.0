angular.module('itinHelper')
    .controller('loginController', loginCtrl)
    // LOGIN CONTROLLER

    function loginCtrl ($http, $state, $window, $rootScope, $location) {
         var logCtrl = this
         logCtrl.page = 'Login'

        //create login method to send user info to server
        logCtrl.login = function(){
            $http.post('/login',{username: logCtrl.username, password: logCtrl.password})
            .then(function(response){
                console.log("from login route",response)
                var token = response.data.token
                    if(token){
                        $window.localStorage.setItem('token',token)
                        $state.go('profile')
                    } else {
                        console.log("no token found")
                    }
                })
            }
        logCtrl.logout = function(){
            $window.localStorage.removeItem('token')
            $state.go('login')
            }
    }
