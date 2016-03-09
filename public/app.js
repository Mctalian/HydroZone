angular.module("HydroZone", [
    'ngMaterial',
    'ui.router'
])
.config(
    [
        '$mdThemingProvider',
        function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('cyan');
        }
    ]
);
