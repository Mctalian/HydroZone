describe('titleSvc', function() {
    var titleSvc;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function(_titleSvc_) {
        titleSvc = _titleSvc_;
    }));

    it('should exist', function() {
        expect(titleSvc).toBeDefined();
    });

    describe('setting and getting the title', function() {
        it('should return the title that was set', function() {
            titleSvc.set('Test');

            expect(titleSvc.get()).toBe('Test');
        });
    });
});
