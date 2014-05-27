angular.module('soutenanceplanner.home')

.controller('HomeCtrl', ['$scope', '$log', 'AccountService','HomeService',
	function($scope, $log, AccountService,HomeService) {
		$log.debug('HomeCtrl');
		
		$scope.calendriers  = [ {
			nom : 'Soutenance M2Sili',
			url : 'url'
		},
		{
			nom : 'Soutenance L3 Info',
			url : 'url'
		},
		{
			nom : 'Soutenance M1 Info',
			url : 'url'
		} ];



		//on récupère les Calendriers créer par l'utilisateur
		HomeService.getCalendars().then(
				function(response){
					$log.debug(response.data);
					//on passe la réponse au scope
					$scope.calendriers = response.data ;
				}
			);
		
		//on récupère les Calendriers a venir
		HomeService.getFuturesCalendars().then(
				function(response){
					$log.debug(response.data);
					//on passe la réponse au scope
					$scope.calendriersAvenir = response.data ;
				}
			);
		
		AccountService.oups().then(
			function(response){
				$log.debug(response.data);
			}
		);
		
	}
])

;