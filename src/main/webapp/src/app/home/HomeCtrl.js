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


		HomeService.getCalendars().then(
				function(response){
					$log.debug(response.data);
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