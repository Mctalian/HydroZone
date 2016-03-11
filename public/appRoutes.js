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
                    templateUrl: 'dashboard/dashboard.tpl.html',
                    controller: 'dashboardCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        devices: ['rachioSvc', function(rachioSvc) {
                            return rachioSvc.getDevices();
                        }]
                    }
                });

            // Remove '#' from URL
            $locationProvider.html5Mode(true);
        }
    ]
);
