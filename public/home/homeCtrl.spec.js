describe('homeCtrl', function() {
    var ctrl, rachioSvcMock, $state, $mdToast, $rootScope, titleSvc;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function($controller, _rachioSvcMock_, _$rootScope_, _titleSvc_) {
        rachioSvcMock = _rachioSvcMock_;
        $state = {
            go: function() {}
        };
        $mdToast = {
            showSimple: function() {}
        };
        $rootScope = _$rootScope_;
        titleSvc = _titleSvc_;

        spyOn($state, 'go');
        spyOn($mdToast, 'showSimple');

        ctrl = $controller('homeCtrl', {
            rachioSvc: rachioSvcMock,
            $state: $state,
            $mdToast: $mdToast,
            titleSvc: titleSvc
        });
    }));

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    describe('submit', function() {
        it('should go to dash state if token is validated', function() {
            ctrl.apiToken = 'abcdef12-3456-7890-fedc-ba0987654321';
            ctrl.submit();

            $rootScope.$digest();

            expect($state.go).toHaveBeenCalled();
        });

        it('should show a toast if token is not valid', function() {
            ctrl.apiToken = 'zzzzzzzz-3456-7890-fedc-ba0987654321';
            ctrl.submit();

            $rootScope.$digest();

            expect($mdToast.showSimple).toHaveBeenCalled();
        });
    });
});
