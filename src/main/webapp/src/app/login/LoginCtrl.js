angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$location', '$cookieStore', 'FactoryService', 'SecurityService', 'AuthenticationService',
	function($rootScope, $scope, $log, $location, $cookieStore, FactoryService, SecurityService, AuthenticationService) {
		$log.debug('LoginCtrl');

		$scope.init = function (){
			FactoryService.authenticate().then(
				function(response){
					$scope.authenticateDTO = response.data;
				}
			);
		};

		$scope.login = function() {
			$scope.$emit('event:loginRequest', $scope.authenticateDTO);
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