angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$scope', '$log', '$location', '$cookieStore',
	function($scope, $log, $location, $cookieStore) {
		$log.debug('LoginCtrl');

		$scope.rememberMe = false;

		$scope.login = function() {
			SecurityService.authenticate("login", "password").then(
				function(response) {
					var authToken = response.data.token;
					$rootScope.authToken = authToken;
					if ($scope.rememberMe) {
						$cookieStore.put('authToken', authToken);
					}

					alert("Connected !");
					$location.path( "/home" );
				}
			);
		};

		$scope.logout = function(){
			delete $rootScope.user;
			delete $rootScope.authToken;
			$cookieStore.remove('authToken');
		};
	}
])

;