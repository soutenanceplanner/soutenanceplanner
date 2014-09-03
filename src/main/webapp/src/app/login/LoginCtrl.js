angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$location', '$cookieStore', 'FactoryService', 'SecurityService', 'LoadService',
	function($rootScope, $scope, $log, $location, $cookieStore, FactoryService, SecurityService, LoadService) {
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
			LoadService.showLoad();
			SecurityService.attemptLogin($scope.authenticateDTO).then(
				function(response){
					if (response.data.error !== null){
						LoadService.hideLoad();
						$scope.essais = $scope.essais + 1;
					}
					else {
						$scope.$emit('event:loginRequest', $scope.authenticateDTO);
					}
				}
			);
		};

		//init
		$scope.init();
	}
])

;