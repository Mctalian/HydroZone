describe('rachioSvc', function() {

    var rachioSvc, $httpBackend;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function(_rachioSvc_, _$httpBackend_) {
        rachioSvc = _rachioSvc_;
        $httpBackend = _$httpBackend_;
    }));

    it('should exist', function() {
        expect(rachioSvc).toBeDefined();
    });

    describe('setApiToken', function() {
        it('should allow valid API Tokens', function() {
            var token = 'abcdef12-3456-7890-fedc-ba0987654321';

            expect(function() {
                rachioSvc.setApiToken(token);
            }).not.toThrow();
        });

        it('should throw a TypeError if the API Token is malformed', function() {
            var token = 'uvwxyzgh-ijkl-mnop-qrst-uvwxyzghij';

            // Bad API Key, doesn't use Hex
            expect(function() {
                rachioSvc.setApiToken(token);
            }).toThrowError(TypeError);
        });
    });
});
