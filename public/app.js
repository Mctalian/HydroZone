angular.module("HydroZone", [
    'ngMaterial'
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
