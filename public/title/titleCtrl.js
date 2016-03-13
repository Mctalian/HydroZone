angular.module('HydroZone')
.controller('titleCtrl',
    [
        'titleSvc',
        function(titleSvc) {
            var ctrl = this;

            ctrl.get = titleSvc.get;
        }
    ]
);
