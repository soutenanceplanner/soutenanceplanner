angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$location', '$cookieStore', 'FactoryService', 'SecurityService',
	function($rootScope, $scope, $log, $location, $cookieStore, FactoryService, SecurityService) {
		$log.debug('LoginCtrl');

		$scope.essais = 0;

		$scope.init = function (){
			FactoryService.authenticate().then(
				function(response){
					$scope.authenticateDTO = response.data;
				},
				function(response){
					$log.debug("erreur serveur");
				}
			);
		};

		$scope.login = function() {
			$scope.$emit('event:loginRequest', $scope.authenticateDTO);
			$scope.essais = $scope.essais + 1;
		};

		$scope.logout = function(){
			$scope.$emit('event:logoutRequest');

			SecurityService.logout().then(function() {
				$rootScope.user = null;
				$state.go('home');
			});
		};

		//init
		$scope.init();
	}
])

;