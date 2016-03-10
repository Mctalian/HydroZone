angular.module('HydroZone')
.controller('homeCtrl',
    [
        'rachioSvc',
        function(rachioSvc) {
            var ctrl = this;

            ctrl.regex = rachioSvc.tokenRegExp;
        }
    ]
);
