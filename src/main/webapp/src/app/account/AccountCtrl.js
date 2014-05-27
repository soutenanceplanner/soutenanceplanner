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
					//$state.go("accountList");
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

.controller('AccountEditCtrl', ['$scope', '$location', '$log',
	function($scope, $location, $log) {
		$log.debug('AccountEditCtrl');

		$scope.flags = [
			{
				id : 5,
				name :'Utilisateur'
			},
			{
				id : 10,
				name : 'Administrateur'
			}
		];

		$scope.user  = {
				id : 1,
				login : 'user',
				password : 'user',
				email : 'user@univ-angers.fr',
				flag : 5
		};
		
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
					$log(response.data);
				}
			);
		};

		//init
		$scope.init();
	}
])

.controller('AccountShowCtrl', ['$scope', '$log',
	function($scope, $log) {
		$log.debug('AccountShowCtrl');
		/**
		 * Default user data
		 */	
		$scope.user  = {
				id : 1,
				login : 'user',
				password : 'password',
				email : 'user@univ-angers.fr',
				flag : 5
		};
	}
])

;