describe('titleCtrl', function() {
    var ctrl, titleSvc;

    beforeEach(module('HydroZone'));
    beforeEach(inject(function($controller, _titleSvc_) {
        titleSvc = _titleSvc_;

        ctrl = $controller('titleCtrl', {
            titleSvc: titleSvc
        });
    }));

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

});
