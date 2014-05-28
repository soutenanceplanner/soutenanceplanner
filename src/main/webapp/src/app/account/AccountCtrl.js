angular.module('soutenanceplanner.account')

.controller('AccountAddCtrl', ['$scope', '$log', '$state', 'AccountService', 'FactoryService', 'EnumService',
	function($scope, $log, $state, AccountService, FactoryService, EnumService) {
		$log.debug('AccountAddCtrl');

		$scope.init = function(){

			FactoryService.user().then(
				function(response){
					$scope.user = response.data;
				}
			);

			EnumService.droit().then(
				function(response){
					$scope.flags = response.data;
				}
			);
		};

		$scope.createUser = function(){
			AccountService.createUser($scope.user).then(
				function(response){
					$log.debug(response.data);
					$state.go("accountList");
				},
				function(response){
					$log.debug("Erreur serveur");
				}
			);
		};
		
		//init
		$scope.init();
	}
])

.controller('AccountEditCtrl', ['$scope', '$location', '$log','$stateParams', 'AccountService', 'EnumService',
	function($scope, $location, $log, $stateParams, AccountService, EnumService) {
		$log.debug('AccountEditCtrl');

		$scope.init = function(){
			AccountService.getUser($stateParams.id).then(
				function(response){
					$scope.user = response.data;
					$log.debug(response.data);
				}
			);

			EnumService.droit().then(
				function(response){
					$scope.flags = response.data;
				}
			);
		};

		$scope.deleteUser = function(id){
			AccountService.deleteUser(id).then(
				function(response){
					$log.debug(response.data);
				}
			);
		};

		//init
		$scope.init();
		
		$scope.accountUpdate = function () {
			alert("Les données ont été mises à jour avec succès !");
			$location.path( "/account" );
		};
	}
])

.controller('AccountListCtrl', ['$scope', '$log', 'AccountService',
	function($scope, $log, AccountService) {
		$log.debug('AccountListCtrl');

		$scope.init = function(){
			AccountService.listUser().then(
				function(response){
					$scope.users = response.data;
					$log.debug(response.data);
				}
			);
		};

		//init
		$scope.init();
	}
])

.controller('AccountShowCtrl', ['$scope', '$log', '$stateParams', 'AccountService',
	function($scope, $log, $stateParams, AccountService) {
		$log.debug('AccountShowCtrl');

		$scope.init = function(){
			AccountService.getUser($stateParams.id).then(
				function(response){
					$scope.user = response.data;
					$log.debug(response.data);
				}
			);
		};

		//init
		$scope.init();
	}
])

;
