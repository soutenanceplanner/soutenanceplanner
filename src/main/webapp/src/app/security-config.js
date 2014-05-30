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

    var useAuthTokenHeader = true;

    /* Registers auth token interceptor, auth token is either passed by header or by query parameter
    * as soon as there is an authenticated user */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
                    'request': function(config) {
                        if (angular.isDefined($rootScope.authToken)) {
                            var authToken = $rootScope.authToken;

                            if (useAuthTokenHeader) {
                                config.headers['X-Auth-Token'] = authToken;
                            } else {
                                config.url = config.url + "?token=" + authToken;
                            }
                        }
                        return config || $q.when(config);
                    }
                };
    });
}])

.run(['$rootScope','$http','$state', '$location', '$cookieStore',
    function($rootScope, $http, $state, $location, $cookieStore) {

        //check login lors d'un rechargement de page
        $rootScope.$on("$routeChangeStart", function() {
            SecurityService.retrieve().success(
                function(data){
                    $rootScope.user = data;
                    if (data === null){
                        $rootScope.$broadcast('event:loginRequired');
                    }
                }
            );
        });

        /**
         * Holds all the requests which failed due to 401 response.
         */
        $rootScope.requests401 = [];

        $rootScope.$on('event:loginRequired', function () {
            $rootScope.requests401 = [];

            /* Try getting valid user from cookie or go to login page */
            var originalPath = $location.path();
            var authToken = $cookieStore.get('authToken');
            if (authToken !== undefined) {
                $rootScope.authToken = authToken;
                //UserService.get(function(user) {
                    //$rootScope.user = user;
                    $location.path(originalPath);
                //});
            }
            else {
                $state.go('login');
            }
        });

        /**
         * On 'event:loginConfirmed', resend all the 401 requests.
         */
        $rootScope.$on('event:loginConfirmed', function () {
            var i;
            var requests = $rootScope.requests401;
            var retry = function (req) {
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
            $state.go("home");
        });

    }
]);