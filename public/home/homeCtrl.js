angular.module('HydroZone')
.controller('homeCtrl',
    [
        'rachioSvc', '$state', '$mdToast',
        function(rachioSvc, $state, $mdToast) {
            var ctrl = this;

            ctrl.regex = rachioSvc.tokenRegExp;

            ctrl.submit = function() {
                rachioSvc.validateToken(ctrl.apiToken).then(function() {
                    $state.go('dash');
                }).catch(function() {
                    $mdToast.showSimple('The API Token you supplied is not authorized');
                });
            };
        }
    ]
);
