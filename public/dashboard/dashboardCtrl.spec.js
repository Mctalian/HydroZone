describe('dashboardCtrl', function() {
    var ctrl, rachioSvcMock, devicesMock, $rootScope, $q;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function($controller, _rachioSvcMock_, _$rootScope_, _$q_) {
        rachioSvcMock = _rachioSvcMock_;
        $rootScope = _$rootScope_;
        $q = _$q_;

        devicesMock = [{
            id: 0,
            zones: [
                {
                    id: 0
                }
            ]
        }];

        $mdSidenavMock = {};

        $mdToast = {
            showSimple: function() {}
        };

        spyOn($mdToast, 'showSimple');

        ctrl = $controller('dashboardCtrl', {
            rachioSvc: rachioSvcMock,
            devices: devicesMock,
            $mdSidenav: $mdSidenavMock,
            $mdToast: $mdToast
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

    describe('startWatering', function() {
        it('should show a good toast if watering was started', function() {
            ctrl.startWatering();

            $rootScope.$digest();

            expect($mdToast.showSimple).toHaveBeenCalledWith('Your zones are being watered!');
        });

        it('should show a bad toast if an error occured', function() {
            spyOn(rachioSvcMock, 'startMultiple').and.callFake(function() {
                return $q.reject(new Error());
            });

            ctrl.startWatering();

            $rootScope.$digest();

            expect($mdToast.showSimple).toHaveBeenCalledWith('There was an error, please try again later');
        });
    });

    describe('selectAllZones', function() {
        it('should cause all zones to be selected', function() {
            ctrl.selectAllZones();

            expect(_.every(ctrl.selectedDevice.zones, 'selected')).toBe(true);
        });
    });

    describe('clearSelectedZones', function() {
        it('should cause all zones to be deselected', function() {
            ctrl.clearSelectedZones();

            expect(_.every(ctrl.selectedDevice.zones, ['selected', false])).toBe(true);
        });
    });
});
