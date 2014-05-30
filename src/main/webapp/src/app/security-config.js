angular.module('soutenanceplanner')

.config(['$httpProvider', 
    function($httpProvider) {

	// ======== http configuration

	//configure $http to view a login whenever a 401 unauthorized response arrives
    $httpProvider.responseInterceptors.push(function ($rootScope, $q){
        return function (promise) {
            return promise.then(
                //success -> don't intercept
                function (response) {
                    return response;
                },
                //error -> if 401 save the request and broadcast an event
                function (response) {
                    if (response.status === 401) {
                        var deferred = $q.defer(),
                        req = {
                            config: response.config,
                            deferred: deferred
                        };
                        $rootScope.requests401.push(req);
                        $rootScope.$broadcast('event:loginRequired');
                        return deferred.promise;
                    }
                    return $q.reject(response);
                }
            );
        };
    });
}])

.run(['$rootScope','$http','$location',
    function($rootScope, $http, $location) {

        $rootScope.$on("$routeChangeStart", function() {
            $http.get('user/authenticated/retrieve').success(function (data) {
                $rootScope.user = data;
                if (data === null){
                    $location.path("/login");
                }
            });
        });

        /**
         * Holds all the requests which failed due to 401 response.
         */
        $rootScope.requests401 = [];

        $rootScope.$on('event:loginRequired', function () {
            $rootScope.requests401 = [];
            
            $location.path('/login');
        });

        /**
         * On 'event:loginConfirmed', resend all the 401 requests.
         */
        $rootScope.$on('event:loginConfirmed', function () {
            var i,
                requests = $rootScope.requests401,
                retry = function (req) {
                    $http(req.config).then(function (response) {
                        req.deferred.resolve(response);
                    });
                };

            for (i = 0; i < requests.length; i += 1) {
                retry(requests[i]);
            }
            $rootScope.requests401 = [];
        });

        /**
         * On 'event:loginRequest' send credentials to the server.
         */
        $rootScope.$on('event:loginRequest', function (event, username, password) {
            // set the basic authentication header that will be parsed in the next request and used to authenticate
            httpHeaders.common['Authorization'] = 'Basic ' + Base64Service.encode(username + ':' + password);
            
            $http.post('user/authenticate').success(function() {
                $rootScope.$broadcast('event:loginConfirmed');
            });
        });

        /**
         * On 'logoutRequest' invoke logout on the server.
         */
        $rootScope.$on('event:logoutRequest', function () {
            httpHeaders.common['Authorization'] = null;
            originalLocation = "/main";
        });

    }
]);