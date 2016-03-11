angular.module('HydroZone')
.controller('dashboardCtrl',
    [
        'rachioSvc', 'devices', '$mdSidenav',
        function(rachioSvc, devices, $mdSidenav) {
            var ctrl = this;

            ctrl.devices = devices;
            ctrl.selectedDevice = devices[0];

            ctrl.$mdSidenav = $mdSidenav;

            ctrl.areZonesSelected = function() {
                return _.some(ctrl.selectedDevice.zones, 'selected');
            };
        }
    ]
);
