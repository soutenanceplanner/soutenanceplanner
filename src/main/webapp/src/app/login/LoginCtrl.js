angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$location', '$cookieStore', 'FactoryService', 'SecurityService', 'AuthenticationService',
	function($rootScope, $scope, $log, $location, $cookieStore, FactoryService, SecurityService, AuthenticationService) {
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
			$scope.$emit('event:loginRequest', $scope.authenticateDTO);

			//SecurityService.authenticate($scope.authenticateDTO).then(
			//	function(response) {
			//		var data = response.data;

			//		if (data.error !== null){
			//			alert(data.error);
			//		}
			//		else {
			//			var authToken = data.value;
			//			$log.debug(authToken);
			//			$rootScope.authToken = authToken;

			//			if($scope.rememberMe){
			//				console.log("put cookie");
			//				$cookieStore.put('X-Auth-Token', authToken);
			//			}
			//			//$location.path( "/home" );
			//			alert("Connected !");
			//		}
					
			//	},
			//	function(response) {
			//		alert("erreur serveur!");
			//	}
			//);
		};

		$scope.logout = function(){
			$scope.$emit('event:logoutRequest');

			AuthenticationService.logout().then(function() {
				$rootScope.user = null;
				$state.go('home');
			});
		};

		//init
		$scope.init();
	}
])

;