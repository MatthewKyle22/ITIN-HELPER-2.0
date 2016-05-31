(function() {
    angular.module('itinHelper', ['ui.router'])
        .run(function ($rootScope, $state, $window) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if(toState.authenticate) {
                    if (!$window.localStorage.getItem('token')) {
                        $state.transitionTo('login')
                        event.preventDefault()
                    }
                }
            })
        })
        .config(Config);
        // .controller('loginController', loginCtrl)
        // .factory('AuthInterceptor', function($q, $location, $window)
        
//******Router Function*******
    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider
        //add .states for each html page
            .state('home', {
                url: '/',
                templateUrl: '/agentLogin/home.html'

            })

            .state('calendar', {
                url: '/calendar',
                templateUrl: '/calendar/calendarV.html',
                controller: 'calendarC as CalCtrl',
            })
            .state('clients', {
                url: '/clients',
                templateUrl: '/clients/clientsV.html'
            });


            $urlRouterProvider.otherwise('/');
    }

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
           }else{
             console.log("no token found")
           }
      })
    }
    logCtrl.logout = function(){
      $window.localStorage.removeItem('token')
      $state.go('login')
    }
  }
}())
