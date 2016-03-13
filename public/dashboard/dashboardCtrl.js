angular.module('HydroZone')
.controller('dashboardCtrl',
    [
        'rachioSvc', 'devices', '$mdSidenav', '$mdToast', '$mdMedia', 'titleSvc',
        function(rachioSvc, devices, $mdSidenav, $mdToast, $mdMedia, titleSvc) {
            var ctrl = this;

            ctrl.devices = devices;
            ctrl.selectedDevice = devices[0];
            ctrl.duration = 0;
            ctrl.disableAll = false;

            ctrl.$mdSidenav = $mdSidenav;
            ctrl.$mdMedia = $mdMedia;

            titleSvc.set('Dashboard');

            ctrl.startWatering = function() {
                ctrl.disableAll = true;
                rachioSvc.startMultiple(ctrl.selectedDevice.zones, ctrl.duration).then(function() {
                    $mdToast.showSimple('Your zones are being watered!');
                    ctrl.disableAll = false;
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

            ctrl.getSelectedZones = function() {
                return _.filter(ctrl.selectedDevice.zones, 'selected');
            };
        }
    ]
);
