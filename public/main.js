(function() {
    angular.module('itinHelper', ['ui.router', 'authService', 'userFactory'])
        .run(function ($rootScope, $state, $window) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                // console.log("authenticating front end");
                if(toState.authenticate) {
                    if (!$window.localStorage.getItem('token')) {
                        $state.transitionTo('login')
                        event.preventDefault()
                    }
                }
            })
        })
        .config(Config)
        // .controller('loginController', loginCtrl)



//******Router Setup*******
    function Config($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor')
        $stateProvider
        //add .states for each html page
            .state('login', {
                url: '/login',
                templateUrl: '/agentLogin/login.html',
                controller: 'loginController as logCtrl',
                authenticate: false
            })

            .state('iBuilder', {
                url: '/',
                templateUrl: '/iBuilder/calendarV.html',
                controller: 'calendarC as CalCtrl',
                authenticate: true
            })
            .state('iClients', {
                url: '/iClients',
                templateUrl: '/iClients/clientsV.html',
                authenticate: true
                // controller: 'itinController as itinCtrl'
            });


            $urlRouterProvider.otherwise('/');
    }

}());
