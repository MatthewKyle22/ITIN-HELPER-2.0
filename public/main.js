angular.module('itinHelper', ['ui.router'])
    .config(Config);

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
