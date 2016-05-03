angular.module('itinHelper', ['ui.router'])
    .config(Config);
    
//******Router Function*******
function Config($stateProvider, $urlRouterProvider) {
    $stateProvider
        //add .states for each html page
            .state('calendar', {
                url: '/calendar',
                templateUrl: 'app/calendar/calendarV.html',
                controller: 'calendarC as CalCtrl',
            })
            .state('clients', {
                url: '/clients',
                templateUrl: 'app/clients/clientsV.html'
            });

            $urlRouterProvider.otherwise('/calendar');
}