describe('appRoutes', function() {

    var $rootScope, $state, $injector, rachioSvcMock, state;

    beforeEach(function() {

        module('HydroZone', function($provide) {
            $provide.value('rachioSvc', rachioSvcMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            // We need add the template entry into the templateCache if we ever
            // specify a templateUrl
            $templateCache.put('dashboard/dashboard.tpl.html', '');
        });
    });

    describe('dash state', function() {
        beforeEach(function() {
            state = 'dash';
        });

        it('should respond to URL', function() {
            expect($state.href(state)).toEqual('/dashboard');
        });

        it('should resolve data', function() {
            rachioSvcMock.getDevices = jasmine.createSpy('getDevices').and.returnValue('devices');

            $state.go(state);
            $rootScope.$digest();
            expect($state.current.name).toBe(state);

            // Call invoke to inject dependencies and run function
            expect($injector.invoke($state.current.resolve.devices)).toBe('devices');
        });
    });
});
