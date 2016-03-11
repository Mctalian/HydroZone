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

    describe('devInd', function() {
        it('should return the index of the device in the devices array', function() {
            expect(ctrl.devInd(devicesMock[0])).toEqual(0);
        });
    });
});
