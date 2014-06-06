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
						content: 'Utilisateur ajouté',
						type: 'success',
						show: true
					});
					$state.go("account.admin");
				},
				function(response){
					$log.debug("Erreur serveur");

					var myAlert = $alert({
						content: 'Erreur serveur',
						type: 'danger',
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
		
		$scope.updateUser = function () {
			AccountService.updateUser($scope.user).then(
				function(response){
					$scope.user = response.data;
					$log.debug(response.data);
					$scope.init();

					var myAlert = $alert({
						content: 'Données mises à jour',
						type: 'success',
						show: true
					});

					$state.go("account.admin");
				}
			);
		};
	}
])

.controller('AccountAdminListCtrl', ['$scope', '$log', '$alert', '$filter', 'AccountService', 'ngTableParams',
	function($scope, $log, $alert, $filter, AccountService, ngTableParams) {
		$log.debug('AccountAdminListCtrl');

		$scope.init = function(){
			AccountService.adminListUser().then(
				function(response){
					var data = response.data;
					$log.debug(data);

					//init tableau
					$scope.initTableau(data);
				}
			);
		};

		$scope.initTableau = function(data){
			$scope.tableParams = new ngTableParams(// jshint ignore:line
				{
					page: 1,// show first page
					count: 10,// count per page
					filter: {
						login: '',// initial filter
						mail: '',// initial filter,
						flag: ''// initial filter
					},
				}, 
				{
				total: data.length, // length of data
				getData: function($defer, params) {
					// use build-in angular filter
					var orderedData = params.filter() ?
					$filter('filter')(data, params.filter()):data;

					$scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
					params.total(orderedData.length); // set total for recalc pagination
					$defer.resolve($scope.users);
				}
			});
		};

		$scope.deleteUser = function(id){
			AccountService.deleteUser(id).then(
				function(response){
					$log.debug(response.data);

					var myAlert = $alert({
						content: 'Utilisateur supprimé',
						type: 'success',
						show: true
					});

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
