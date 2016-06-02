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
        .config(Config)
        // .controller('loginController', loginCtrl)
    


//******Router Setup*******
    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider
        //add .states for each html page
            .state('home', {
                url: '/',
                templateUrl: '/agentLogin/login.html',
                controller: 'loginController as logCtrl'
            })

            .state('iBuilder', {
                url: '/iBuilder',
                templateUrl: '/iBuilder/calendarV.html',
                controller: 'calendarC as CalCtrl',
            })
            .state('iClients', {
                url: '/iClients',
                templateUrl: '/iClients/clientsV.html'
            });


            $urlRouterProvider.otherwise('/');
    }

}());
