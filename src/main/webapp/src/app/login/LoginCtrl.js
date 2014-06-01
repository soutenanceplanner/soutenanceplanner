angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$scope', '$log', '$location', '$cookieStore', 'FactoryService', 'SecurityService',
	function($scope, $log, $location, $cookieStore, FactoryService, SecurityService) {
		$log.debug('LoginCtrl');

		$scope.rememberMe = false;

		$scope.init = function (){
			FactoryService.authenticate().then(
				function(response){
					$scope.authenticateDTO = response.data;
				}
			);
		};

		$scope.login = function() {
			SecurityService.authenticate($scope.authenticateDTO).then(
				function(response) {
					var data = response.data;

					if (data.error !== null){
						alert(data.error);
					}
					else {
						$log.debug(data.returnValue);
						alert("Connected !");
					}
					//$rootScope.authToken = authToken;
					//if ($scope.rememberMe) {
					//	$cookieStore.put('authToken', authToken);
					//}
					//$location.path( "/home" );
				},
				function(response) {
					alert("erreur serveur!");
				}
			);
		};

		$scope.logout = function(){
			delete $rootScope.user;
			delete $rootScope.authToken;
			$cookieStore.remove('authToken');
		};

		//init
		$scope.init();
	}
])

;