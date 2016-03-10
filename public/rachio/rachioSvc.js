angular.module('HydroZone')
.service('rachioSvc',
    [
        '$http',
        function($http) {
            var apiToken;

            var svc = this;

            function setApiToken(token) {
                var re = new RegExp(/^[A-F,a-f,0-9]{8}-([A-F,a-f,0-9]{4}-){3}[A-F,a-f,0-9]{12}$/);
                if (re.test(token)) {
                    apiToken = token;
                }
                else {
                    throw new TypeError('Invalid API Token');
                }
            }

            svc.setApiToken = setApiToken;
        }
    ]
);
