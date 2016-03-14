angular.module('HydroZone', [
    'ngMaterial',
    'ui.router'
])
.config(
    [
        '$mdThemingProvider',
        function($mdThemingProvider) {
            var rachioBlue = $mdThemingProvider.extendPalette('light-blue', {
                '500': '00A7E1',
                '800': '01579B',
                '900': '0E4475',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    '400',
                    'A100',
                    'A200',
                    'A400'
                ]
            });
            $mdThemingProvider.definePalette('rachio-blue', rachioBlue);
            $mdThemingProvider.theme('default')
                .primaryPalette('rachio-blue')
                .accentPalette('blue-grey');
        }
    ]
);
