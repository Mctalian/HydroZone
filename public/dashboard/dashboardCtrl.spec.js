describe('dashboardCtrl', function() {
    var ctrl, rachioSvcMock, devicesMock;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function($controller, _rachioSvcMock_) {
        rachioSvcMock = _rachioSvcMock_;

        devicesMock = [{
            id: 0,
            zones: [
                {
                    id: 0
                }
            ]
        }];

        ctrl = $controller('dashboardCtrl', {
            rachioSvc: rachioSvcMock,
            devices: devicesMock
        });
    }));

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    describe('areZonesSelected', function() {
        it('should return true if a zone is selected', function() {
            ctrl.selectedDevice.zones[0].selected = true;
            expect(ctrl.areZonesSelected()).toBe(true);
        });

        it('should return false if a zone is not selected', function() {
            ctrl.selectedDevice.zones[0].selected = false;
            expect(ctrl.areZonesSelected()).toBe(false);
        });
    });
});
