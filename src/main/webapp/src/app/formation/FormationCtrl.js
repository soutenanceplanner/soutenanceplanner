angular.module('soutenanceplanner.formation')

.controller('FormationAddCtrl', ['$scope', '$log', '$state', 'FormationService', 'FactoryService',
	function($scope, $log, $state, FormationService, FactoryService) {
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
					$state.go("formation");
					alert("La formation a été ajoutée avec succès !");
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

.controller('FormationEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', 'FormationService',
	function($scope, $location, $log, $state, $stateParams, FormationService) {
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

					alert("Les données ont été mises à jour avec succès !");
					$state.go("formation");
				}
			);
		};
	}
])

.controller('FormationListCtrl', ['$scope', '$log', 'FormationService',
	function($scope, $log, FormationService) {
		$log.debug('FormationListCtrl');

		$scope.init = function(){
			FormationService.listFormation().then(
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
