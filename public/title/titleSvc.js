angular.module('HydroZone')
.service('titleSvc',
    [
        function() {
            var svc = this;

            var title;

            svc.set = function(text) {
                title = text;
            };

            svc.get = function() {
                return title;
            };
        }
    ]
);
