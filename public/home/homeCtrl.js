angular.module('HydroZone')
.controller('homeCtrl',
    [
        'rachioSvc', '$state', '$mdToast',
        function(rachioSvc, $state, $mdToast) {
            var ctrl = this;

            ctrl.regex = rachioSvc.tokenRegExp;
            ctrl.disableAll = false;

            ctrl.submit = function() {
                ctrl.disableAll = true;
                rachioSvc.validateToken(ctrl.apiToken).then(function() {
                    $state.go('dash');
                }).catch(function() {
                    ctrl.disableAll = false;
                    $mdToast.showSimple('The API Token you supplied is not authorized');
                });
            };
        }
    ]
);
