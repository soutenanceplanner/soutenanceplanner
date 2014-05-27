angular.module('soutenanceplanner.formation')

.controller('FormationAddCtrl', ['$scope', '$log', 'FormationService',
	function($scope, $log, FormationService) {
		$log.debug('FormationAddCtrl');

		$scope.formationAdd = function () {
			alert("La formation a été ajoutée avec succès !");
			$location.path( "/formationList" );
		};

		FormationService.oups().then(
			function(response){
				$log.debug(response.data);
			}
		);
	}
])

.controller('FormationEditCtrl', ['$scope', '$location', '$log',
	function($scope, $location, $log) {
		$log.debug('FormationEditCtrl');

		$scope.formation = {
				id : 1,
				name : 'M2 Sili'
		};
		
		$scope.formationUpdate = function () {
			alert("Les données ont été mises à jour avec succès !");
			$location.path( "/formation" );
		};
	}
])

.controller('FormationListCtrl', ['$scope', '$log',
	function($scope, $log) {
		$log.debug('FormationListCtrl');
		
		$scope.formations  = [
			{
				id : 1,
				name : 'M2 Sili'
			},
			{
				id : 2,
				name : 'L3 Info'
			},
			{
				id : 3,
				name : 'M1 Info'
			},
			{
				id : 4,
				name : 'L2 Info'
			}
		];

		$scope.deleteFormation = function () {
			alert("La formation a été suprimée avec succès !");
		};
	}
])

.controller('FormationShowCtrl', ['$scope', '$log',
	function($scope, $log) {
		$log.debug('FormationShowCtrl');
		/**
		 * Default formation data
		 */	
		$scope.formation  = {
				id : 1,
				name : 'M2 Sili'
		};
	}
])

;