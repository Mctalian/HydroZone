angular.module('HydroZone')
.service('rachioSvcMock',
    [
        '$q',
        function($q) {
            var svc = this;

            // PRIVATE VARS
            var apiToken;
            var personId;

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
            svc.tokenRegExp = new RegExp(/^[A-F,a-f,0-9]{8}-?([A-F,a-f,0-9]{4}-?){3}[A-F,a-f,0-9]{12}$/);

            // PUBLIC FUNCTIONS
            svc.validateToken = function validateToken(token) {
                if (setApiToken(token)) {
                    return $q.when("c8d10892-fd69-48b3-8743-f111e4392d8a");
                }
                else {
                    return $q.reject(new Error());
                }
            };

            svc.startMultiple = function() {
                return $q.when({"status": "OK"});
            };
        }
    ]
);
