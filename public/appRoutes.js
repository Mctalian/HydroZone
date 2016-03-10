angular.module('HydroZone')
.config(
    [
        '$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

            // Unknown URLS redirect to home URL
            $urlRouterProvider.otherwise('/');

            $stateProvider
                // Home page
                .state('home', {
                    url: '/',
                    templateUrl: 'home/home.tpl.html',
                    controller: 'homeCtrl',
                    controllerAs: 'vm'
                })

                .state('dash', {
                    url: '/dashboard',
                    template: '<div>This is the dash</div>'
                });

            // Remove '#' from URL
            $locationProvider.html5Mode(true);
        }
    ]
);
