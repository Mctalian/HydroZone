angular.module('HydroZone')
.controller('dashboardCtrl',
    [
        'rachioSvc', 'devices',
        function(rachioSvc, devices) {
            var ctrl = this;

            ctrl.devices = devices;
            ctrl.selectedDevice = devices[0];

            ctrl.devInd = function(device) {
                return devices.indexOf(device);
            };
        }
    ]
);
