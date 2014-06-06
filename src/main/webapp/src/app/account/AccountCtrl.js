angular.module('soutenanceplanner.account')

.controller('AccountAddCtrl', ['$scope', '$log', '$state', '$alert', 'AccountService', 'FactoryService', 'EnumService',
	function($scope, $log, $state, $alert, AccountService, FactoryService, EnumService) {
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

					var myAlert = $alert({
						title: '', 
						content: 'Utilisateur ajouté',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});
					$state.go("account");
				},
				function(response){
					$log.debug("Erreur serveur");

					var myAlert = $alert({
						title: '', 
						content: 'Erreur serveur',
						placement: 'top-right',
						type: 'danger',
						duration : '3',
						show: true
					});
				}
			);
		};
		
		//init
		$scope.init();
	}
])

.controller('AccountEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', '$alert', 'AccountService', 'EnumService',
	function($scope, $location, $log, $state, $stateParams, $alert, AccountService, EnumService) {
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

		//init
		$scope.init();
		
		$scope.validate = function(){
			
			if( ($scope.editAccountForm.$invalid === false)&& 
				($scope.passwordConfirm == $scope.user.password)){
				updateUser();
			}else{
				$log.debug("Erreur formulaire");
						
			}
			
		};
		
		var updateUser = function () {
			AccountService.updateUser($scope.user).then(
				function(response){
					$scope.user = response.data;
					$log.debug(response.data);
					$scope.init();

					var myAlert = $alert({
						title: 'Mise à jour', 
						content: 'Données mises à jour',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});

			//		$state.go("account");
				}
			);
		};
	}
])

.controller('AccountAdminListCtrl', ['$scope', '$log', 'AccountService',
	function($scope, $log, AccountService) {
		$log.debug('AccountAdminListCtrl');

		$scope.init = function(){
			AccountService.adminListUser().then(
				function(response){
					$scope.users = response.data;
					$log.debug(response.data);
				}
			);
		};

		$scope.deleteUser = function(id){
			AccountService.deleteUser(id).then(
				function(response){
					$log.debug(response.data);
					$scope.init();
				}
			);
		};

		//init
		$scope.init();
	}
])

.controller('AccountDetailCtrl', ['$scope', '$log', '$stateParams', 'AccountService',
	function($scope, $log, $stateParams, AccountService) {
		$log.debug('AccountDetailCtrl');

		$scope.init = function(){
			AccountService.getUser($stateParams.id).then(
				function(response){
					$log.debug(response.data);
					$scope.user = response.data;
				}
			);
		};

		//init
		$scope.init();
	}
])

.controller('AccountCurrentUserDetailCtrl', ['$scope', '$log', '$stateParams', 'SecurityService',
	function($scope, $log, $stateParams, SecurityService) {
		$log.debug('AccountDetailCtrl');

		$scope.init = function(){
			SecurityService.retrieveUser().then(
				function(response){
					$log.debug(response.data);
					$scope.user = response.data;
				}
			);
		};

		//init
		$scope.init();
	}
])

;
