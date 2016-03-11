angular.module('HydroZone')
.service('rachioSvc',
    [
        '$http', '$q',
        function($http, $q) {
            var svc = this;

            // PRIVATE VARS
            const RACH_IO = 'https://api.rach.io/1/public';
            var httpConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': function() {
                        return 'Bearer ' + apiToken;
                    }
                }
            };
            var apiToken;
            var personId;
            var personObj;
            var devices;

            // PRIVATE FUNCTIONS
            function setApiToken(token) {
                var re = svc.tokenRegExp;
                if (re.test(token)) {
                    apiToken = token;
                    return true;
                }
                else {
                    return false;
                }
            }

            // PUBLIC VARS
            svc.tokenRegExp = new RegExp(/^[A-F,a-f,0-9]{8}-([A-F,a-f,0-9]{4}-){3}[A-F,a-f,0-9]{12}$/);

            // PUBLIC FUNCTIONS
            svc.validateToken = function validateToken(token) {
                return $q(function(resolve, reject) {
                    if (setApiToken(token)) {
                        $http.get(RACH_IO + '/person/info', httpConfig).then(function success(res) {
                            personId = res.data.id;
                            return resolve(personId);
                        }, function error(res) {
                            return reject(new Error(res.status));
                        });
                    }
                    else {
                        return reject(new Error('Malformed API Token'));
                    }
                });
            };

            svc.getDevices = function getDevices(id) {
                var pId = personId || id;

                return $q(function(resolve, reject) {
                    if (!pId) {
                        return reject(new Error(403));
                    }

                    if (!devices) {
                        $http.get(RACH_IO + '/person/' + pId, httpConfig).then(function success(res) {
                            personObj = res.data;
                            devices = personObj.devices;
                            return resolve(devices);
                        }, function error(res) {
                            return reject(new Error(res.status));
                        });
                    }
                    else {
                        return resolve(devices);
                    }
                });
            };
        }
    ]
);
