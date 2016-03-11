describe('rachioSvc', function() {

    var rachioSvc, $httpBackend, $rootScope, goodToken, badToken;

    var fakeId = "c8d10892-fd69-48b3-8743-f111e4392d8a";

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
        const PERSON_INFO_URL = 'https://api.rach.io/1/public/person/info';

        afterEach(function() {
            $rootScope.$digest(); // Make sure promises are resolved
        });

        it('should provide the person id if the token is valid', function() {
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

    describe('getDevices', function() {
        var infoHandler;
        const PERSON_URL = 'https://api.rach.io/1/public/person/';
        var goodResponse = {
            "id":"3c59a593-04b8-42df-91db-758f4fe4a97f",
            "username":"franz",
            "fullName":"Franz Garsombke",
            "email":"franz@rach.io",
            "devices":[
                {
                    "id":"2a5e7d3c-c140-4e2e-91a1-a212a518adc5",
                    "status":"ONLINE",
                    "zones":[
                        {
                            "id":"e02de192-5a2b-4669-95c6-34deea3d23cb",
                            "zoneNumber":3,
                            "name":"Zone 3",
                            "enabled":false,
                            "customNozzle":{
                                "name":"Fixed Spray Head",
                                "imageUrl":"https://s3-us-west-2.amazonaws.com/rachio-api-icons/nozzle/fixed_spray.png",
                                "category":"FIXED_SPRAY_HEAD",
                                "inchesPerHour":1.4
                            },
                            "availableWater":0.17,
                            "rootZoneDepth":10,
                            "managementAllowedDepletion":0.5,
                            "efficiency":0.6,
                            "yardAreaSquareFeet":1000,
                            "irrigationAmount":0,
                            "depthOfWater":0.85,
                            "runtime":3643
                        }
                    ],
                    "timeZone":"America/Denver",
                    "latitude":39.84634,
                    "longitude":-105.3383,
                    "zip":"80403",
                    "name":"Prototype 7",
                    "scheduleRules":[
                        {
                            "id":"cc9c6e6f-c285-4a7b-9911-ff6065e7ff5b",
                            "name":"",
                            "externalName":"unknown"
                        }
                    ],
                    "serialNumber":"PROTOTYPE7SN",
                    "rainDelayExpirationDate":1420027691501,
                    "rainDelayStartDate":1420026367029,
                    "macAddress":"PROTOTYPE7MA",
                    "elevation":2376.8642578125,
                    "webhooks":[

                    ],
                    "paused":false,
                    "on":true,
                    "flexScheduleRules":[

                    ],
                    "utcOffset":-25200000
                }
            ],
            "enabled":true
        };

        afterEach(function() {
            $rootScope.$digest(); // Make sure promises are resolved
        });

        it('should provide person details if the person exists', function() {
            infoHandler = $httpBackend
                .whenGET(PERSON_URL + fakeId)
                .respond(200, goodResponse);

            $httpBackend.expectGET(PERSON_URL + fakeId);

            rachioSvc.getDevices(fakeId).then(function(response) {
                expect(response).toEqual(goodResponse.devices);
            });

            $httpBackend.flush();
        });

        it('should return an error if the person is unavailable', function() {
            infoHandler = $httpBackend
                .whenGET(PERSON_URL + fakeId)
                .respond(403);

            $httpBackend.expectGET(PERSON_URL + fakeId);

            rachioSvc.getDevices(fakeId).then().catch(function(err) {
                expect(err.message).toBeDefined();
            });

            $httpBackend.flush();
        });

        it('should return an error if no personId is supplied', function() {
            rachioSvc.getDevices().then().catch(function(err) {
                expect(err.message).toBeDefined();
            });
        });

        it('should not call the API if it already has devices', function() {
            infoHandler = $httpBackend
                .whenGET(PERSON_URL + fakeId)
                .respond(200, goodResponse);

            $httpBackend.expectGET(PERSON_URL + fakeId);

            rachioSvc.getDevices(fakeId).then(function(response) {
                expect(response).toEqual(goodResponse.devices);
            });

            $rootScope.$digest();

            $httpBackend.flush();

            rachioSvc.getDevices(fakeId).then(function(response) {
                expect(response).toEqual(goodResponse.devices);
            });
        });
    });
});
