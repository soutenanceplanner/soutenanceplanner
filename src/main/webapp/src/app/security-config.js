angular.module('soutenanceplanner')

.config(['$httpProvider', 
    function($httpProvider) {

	// ======== http configuration

	//configure $http to view a login whenever a 401 unauthorized response arrives
    $httpProvider.responseInterceptors.push(function ($rootScope, $q, $injector){
        return function (promise) {
            return promise.then(
                //success -> don't intercept
                function (response) {
                    return response;
                },
                //error -> if 401 save the request and broadcast an event
                function (response) {
                    if (response.status === 401) {
                        //si on est déjà dans le state 401, on ne fait rien
                        var state = $injector.get('$state');
                        if (state.current.name === "loginRequired" || 
                            state.current.name === "login"){
                            return $q.reject(response);
                        }

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

    httpHeaders = $httpProvider.defaults.headers;

}])

.run(['$rootScope','$http','$state', '$location', '$cookieStore', '$log', 'SecurityService', 'Base64Service', 'LoginService',
    function($rootScope, $http, $state, $location, $cookieStore, $log, SecurityService, Base64Service, LoginService) {

        //check login lors d'un rechargement de page
        $rootScope.$on("$routeChangeStart", function() {
            SecurityService.retrieve().success(
                function(data){
                    $rootScope.user = data;

                    $scope.userLogin = data.username;
                    if(data.username == null){
                        $state.go($state.$current, null, { reload: true });
                        $state.go('loginRequired');
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

            LoginService.setOldPath($location.path());
            $state.go('loginRequired');
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

            //reload Menus
            $rootScope.$broadcast('event:reloadMainCtrl');

            var path = LoginService.getOldPath();
            $location.path(path);

            $rootScope.requests401 = [];
        });

        /**
         * On 'event:loginRequest' send credentials to the server.
         */
        $rootScope.$on('event:loginRequest', function (event, authenticateDTO) {
            // set the basic authentication header that will be parsed in the next request and used to authenticate
            httpHeaders.common['Authorization'] = 'Basic ' + Base64Service.encode(authenticateDTO.login + ':' + authenticateDTO.password);
            
            SecurityService.authenticate(authenticateDTO).success(
                function() {
                    $rootScope.$broadcast('event:loginConfirmed');
                }
            );
        });

        /**
         * On 'logoutRequest' invoke logout on the server.
         */
        $rootScope.$on('event:logoutRequest', function () {
            httpHeaders.common['Authorization'] = null;
            SecurityService.logout().then(//renvoie une 302 sans Allow-Origin -> erreur
                function() {
                },
                function(){//donc get ici en principe
                    $rootScope.$broadcast('event:reloadMainCtrl');
                    $state.go("home");
                }
            );
        });

    }
])

.service('Base64Service', function () {
    var keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";
    this.encode = function (input) {
        var output = "",
            chr1, chr2, chr3 = "",
            enc1, enc2, enc3, enc4 = "",
            i = 0;

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        }

        return output;
    };

    this.decode = function (input) {
        var output = "",
            chr1, chr2, chr3 = "",
            enc1, enc2, enc3, enc4 = "",
            i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        }
    };
});