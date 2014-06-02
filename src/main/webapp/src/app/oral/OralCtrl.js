angular.module('soutenanceplanner.oral')

.controller('OralAddCtrl', ['$scope', '$log', '$state', 'OralService', 'FactoryService',
	function($scope, $log, $state, OralService, FactoryService) {
		$log.debug('OralAddCtrl');

	}
])

.controller('OralEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', 'OralService',
	function($scope, $location, $log, $state, $stateParams, OralService) {
		$log.debug('OralEditCtrl');

	}
])

.controller('OralListCtrl', ['$scope', '$log', '$state', '$stateParams', 'OralService', 'CalendarService',
	function($scope, $log, $state, $stateParams, OralService) {
		$log.debug('OralListCtrl');

		// id du user en dure, à terme récupérer l'id du user connecté
		$scope.user_id = 1;
		
		$scope.init = function(){
			OralService.listUserOral($scope.user_id).then(
				function(response){
					$scope.orals = response.data;
					$log.debug(response.data);
				}
			);
		};
		
		/*
		$scope.init = function(){
			OralService.listOral().then(
				function(response){
					$scope.orals = response.data;
					$log.debug(response.data);
				}
			);
		};

		$scope.deleteOral = function(id){
			OralService.deleteOral(id).then(
				function(response){
					$log.debug(response.data);
					$scope.init();
				}
			);
		};
		*/

		//init
		$scope.init();
	}
])

.controller('OralDetailCtrl', ['$scope', '$log', '$stateParams', 'OralService',
	function($scope, $log, $stateParams, OralService) {
		$log.debug('OralDetailCtrl');
	}
])

;
