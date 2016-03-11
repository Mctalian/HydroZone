angular.module('HydroZone')
.controller('dashboardCtrl',
    [
        'rachioSvc', 'devices',
        function(rachioSvc, devices) {
            var ctrl = this;

            ctrl.devices = devices;
            ctrl.selectedDevice = devices[0];
        }
    ]
);
