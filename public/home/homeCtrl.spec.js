describe('homeCtrl', function() {
    var ctrl, rachioSvc;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function($controller, _rachioSvc_) {
        rachioSvc = _rachioSvc_;

        ctrl = $controller('homeCtrl', {
            rachioSvc: rachioSvc
        });
    }));

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });
});
