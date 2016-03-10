describe('rachioSvc', function() {

    var rachioSvc, $httpBackend, $rootScope, goodToken, badToken;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function(_rachioSvc_, _$httpBackend_, _$rootScope_) {
        rachioSvc = _rachioSvc_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;

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

    describe('validateToken', function() {
        var infoHandler;
        const PERSON_INFO_URL = 'https://api.rach.io/public/person/info';

        afterEach(function() {
            $rootScope.$digest(); // Make sure promises are resolved
        });

        it('should provide the person id if the token is valid', function() {
            var fakeId = "c8d10892-fd69-48b3-8743-f111e4392d8a";
            infoHandler = $httpBackend
                .whenGET(PERSON_INFO_URL)
                .respond(200, {
                    "id" : fakeId
                });

            $httpBackend.expectGET(PERSON_INFO_URL);

            rachioSvc.validateToken(goodToken).then(function(response) {
                expect(response).toBe(fakeId);
            });

            $httpBackend.flush();
        });

        it('should return an error if the token is malformed', function() {
            rachioSvc.validateToken(badToken).then().catch(function(err) {
                expect(err.message).toBeDefined();
            });
        });

        it('should return an error if the token is invalid or unauthorized', function() {
            infoHandler = $httpBackend
                .whenGET(PERSON_INFO_URL)
                .respond(401, {
                    "errors": [
                        {
                            "message": "The client is not authorized."
                        }
                    ]
                });

            $httpBackend.expectGET(PERSON_INFO_URL);

            rachioSvc.validateToken(goodToken).then().catch(function(err) {
                expect(err.message).toBeDefined();
            });

            $httpBackend.flush();
        });
    });
});
