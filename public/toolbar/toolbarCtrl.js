angular.module('HydroZone')
.controller('toolbarCtrl',
    [
        '$state',
        function($state) {
            var ctrl = this;

            ctrl.isHomeState = function() {
                return $state.is('home');
            };
        }
    ]
);
