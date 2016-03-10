describe('rachioSvc', function() {

    var rachioSvc, $httpBackend, goodToken, badToken;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function(_rachioSvc_, _$httpBackend_) {
        rachioSvc = _rachioSvc_;
        $httpBackend = _$httpBackend_;

        goodToken = 'abcdef12-3456-7890-fedc-ba0987654321';
        badToken = 'uvwxyzgh-ijkl-mnop-qrst-uvwxyzghij';
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should exist', function() {
        expect(rachioSvc).toBeDefined();
    });

    describe('setApiToken', function() {
        it('should allow valid API Tokens', function() {
            expect(function() {
                rachioSvc.setApiToken(goodToken);
            }).not.toThrow();
        });

        it('should throw a TypeError if the API Token is malformed', function() {
            // Bad API Key, doesn't use Hex
            expect(function() {
                rachioSvc.setApiToken(badToken);
            }).toThrowError(TypeError);
        });
    });

    describe('validateToken', function() {
        var infoHandler;

        it('should populate the person id if the token is valid', function() {
            infoHandler = $httpBackend
                .whenGET('https://api.rach.io/public/person/info')
                .respond(200, {
                    "id" : "c8d10892-fd69-48b3-8743-f111e4392d8a"
                });

            $httpBackend.expectGET('https://api.rach.io/public/person/info');

            rachioSvc.validateToken(goodToken);
            expect(rachioSvc.getPersonId()).not.toThrowError();
        });

        it('should throw an error if the token is invalid', function() {

            infoHandler = $httpBackend
                .whenGET('https://api.rach.io/public/person/info')
                .respond(401, {
                    "errors": [
                        {
                            "message": "The client is not authorized."
                        }
                    ]
                });

            $httpBackend.expectGET('https://api.rach.io/public/person/info');

            expect(function() {
                rachioSvc.validateToken(badToken);
            }).toThrowError(Error);
        });
    });
});
