angular.module('soutenanceplanner.formation')

.controller('FormationAddCtrl', ['$scope', '$log', 'FormationService',
	function($scope, $log, FormationService) {
		$log.debug('FormationAddCtrl');

		$scope.formationAdd = function () {
			alert("La formation a été ajoutée avec succès !");
			$location.path( "/formationList" );
		};
	}
])

.controller('FormationEditCtrl', ['$scope', '$location', '$log', '$stateParams', 'FormationService',
	function($scope, $location, $log, $stateParams, FormationService) {
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
		
		$scope.formationUpdate = function () {
			alert("Les données ont été mises à jour avec succès !");
			$location.path( "/formation" );
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

.controller('FormationShowCtrl', ['$scope', '$log', '$stateParams', 'FormationService',
	function($scope, $log, $stateParams, FormationService) {
		$log.debug('FormationShowCtrl');

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