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

					var myAlert = $alert({
						title: '', 
						content: 'Formation ajoutée',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});
					$state.go("formation");
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
					$state.go("formation");
				}
			);
		};
	}
])

.controller('FormationAdminListCtrl', ['$scope', '$log', '$alert', 'FormationService',
	function($scope, $log, $alert, FormationService) {
		$log.debug('FormationListCtrl');

		$scope.init = function(){
			FormationService.adminListFormation().then(
				function(response){
					$scope.formations = response.data;
					$log.debug(response.data);
				}
			);
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

					$scope.init();
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
