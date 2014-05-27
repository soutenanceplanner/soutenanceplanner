angular.module('soutenanceplanner.home')

.controller('HomeCtrl', ['$scope', '$log', '$location', 'AccountService',
	function($scope, $log, $location, AccountService) {
		$log.debug('HomeCtrl');
		
		$scope.calendriers  = [ {
			nom : 'Soutenance M2 Sili',
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

		AccountService.oups().then(
			function(response){
				$log.debug(response.data);
			}
		);
	}
])

;