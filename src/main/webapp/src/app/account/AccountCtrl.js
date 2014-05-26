angular.module('soutenanceplanner.account')

.controller('AccountAddCtrl', ['$scope', '$log', 'AccountService',
	function($scope, $log, AccountService) {
		$log.debug('AccountAddCtrl');

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

		$scope.user = {
			flag : $scope.flags[0]
		};

		AccountService.oups().then(
			function(response){
				$log.debug(response.data);
			}
		);
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