angular.module('soutenanceplanner.formation')

.controller('FormationAddCtrl', ['$scope', '$log', '$state', '$alert', 'FormationService', 'FactoryService',
	function($scope, $log, $state, $alert, FormationService, FactoryService) {
		$log.debug('FormationAddCtrl');

		$scope.init = function(){

			FactoryService.formation().then(
				function(response){
					$scope.formation = response.data;
				}
			);
		};

		$scope.createFormation = function(){
			FormationService.createFormation($scope.formation).then(
				function(response){
					$log.debug(response.data);
					var data = response.data;

					if (data.error !== null){
						$alert({
							title: '', 
							content: data.error,
							placement: 'top-right',
							type: 'danger',
							duration : '3',
							show: true
						});
					}
					else {
						var myAlert = $alert({
							title: '', 
							content: 'Formation ajoutée',
							placement: 'top-right',
							type: 'success',
							duration : '3',
							show: true
						});
						$state.go("formation.admin");
					}
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

.controller('FormationEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', '$alert', 'FormationService',
	function($scope, $location, $log, $state, $stateParams, $alert, FormationService) {
		$log.debug('FormationEditCtrl');

		$scope.init = function(){
			FormationService.getFormation($stateParams.id).then(
				function(response){
					$scope.formation = response.data;
					$log.debug(response.data);
				}
			);
		};

		//init
		$scope.init();
		
		$scope.updateFormation = function () {
			FormationService.updateFormation($scope.formation).then(
				function(response){
					$scope.formation = response.data;
					$log.debug(response.data);
					$scope.init();

					var myAlert = $alert({
						title: '', 
						content: 'Formation mise à jour',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});
					$state.go("formation.admin");
				}
			);
		};
	}
])

.controller('FormationAdminListCtrl', ['$scope', '$log', '$alert', '$filter', 'FormationService', 'ngTableParams',
	function($scope, $log, $alert, $filter, FormationService, ngTableParams) {
		$log.debug('FormationListCtrl');

		$scope.init = function(){
			$scope.initTableau();
		};

		$scope.initTableau = function(data){
			$scope.tableParams = new ngTableParams(// jshint ignore:line
				{
					page: 1,// show first page
					count: 10,// count per page
					filter: {
						name: ''// initial filter
					},
				}, 
				{
				total: 0,// length of data
				getData: function($defer, params) {
					//request to api
					FormationService.adminListFormation().then(
						function(response) {
							var data = response.data;
							
							// update table params
							params.total(data.length);

							// use build-in angular filter
							var orderedData = params.filter() ?
							$filter('filter')(data, params.filter()):data;

							$scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
							params.total(orderedData.length); // set total for recalc pagination
							$defer.resolve($scope.users);
					});
				}
			});
		};

		$scope.deleteFormation = function(id){
			FormationService.deleteFormation(id).then(
				function(response){
					$log.debug(response.data);

					var myAlert = $alert({
						title: '', 
						content: 'Formation supprimée',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});

					$scope.tableParams.reload();
				}
			);
		};

		//init
		$scope.init();
	}
])

.controller('FormationDetailCtrl', ['$scope', '$log', '$stateParams', 'FormationService',
	function($scope, $log, $stateParams, FormationService) {
		$log.debug('FormationDetailCtrl');

		$scope.init = function(){
			FormationService.getFormation($stateParams.id).then(
				function(response){
					$scope.formation = response.data;
					$log.debug(response.data);
				}
			);
		};

		//init
		$scope.init();
	}
])

;
