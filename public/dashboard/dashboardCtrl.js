angular.module('HydroZone')
.controller('dashboardCtrl',
    [
        'rachioSvc', 'devices', '$mdSidenav', '$mdToast', '$mdMedia',
        function(rachioSvc, devices, $mdSidenav, $mdToast, $mdMedia) {
            var ctrl = this;

            ctrl.devices = devices;
            ctrl.selectedDevice = devices[0];
            ctrl.duration = 0;

            ctrl.$mdSidenav = $mdSidenav;
            ctrl.$mdMedia = $mdMedia;

            ctrl.startWatering = function() {
                rachioSvc.startMultiple(ctrl.selectedDevice.zones, ctrl.duration).then(function() {
                    $mdToast.showSimple('Your zones are being watered!');
                }).catch(function() {
                    $mdToast.showSimple('There was an error, please try again later');
                });
            };

            ctrl.areZonesSelected = function() {
                return _.some(ctrl.selectedDevice.zones, 'selected');
            };

            ctrl.selectAllZones = function() {
                _.each(ctrl.selectedDevice.zones, function(value) {
                    value.selected = true;
                });
            };

            ctrl.clearSelectedZones = function() {
                _.each(ctrl.selectedDevice.zones, function(value) {
                    value.selected = false;
                });
            };
        }
    ]
);
