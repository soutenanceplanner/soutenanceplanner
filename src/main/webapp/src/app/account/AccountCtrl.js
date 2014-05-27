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

.controller('AccountListCtrl', ['$scope', '$log',
	function($scope, $log) {
		$log.debug('AccountListCtrl');
		
		$scope.users  = [
			{
				id : 1,
				login : 'user1',
				password : 'user1',
				email : 'user1@univ-angers.fr',
				flag : 5
			},
			{
				id : 2,
				login : 'user2',
				password : 'user2',
				email : 'user2@univ-angers.fr',
				flag : 5
			},
			{
				id : 3,
				login : 'admin1',
				password : 'admin1',
				email : 'admin1@univ-angers.fr',
				flag : 10
			},
			{
				id : 4,
				login : 'admin2',
				password : 'admin2',
				email : 'admin2@univ-angers.fr',
				flag : 10
			}
		];
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