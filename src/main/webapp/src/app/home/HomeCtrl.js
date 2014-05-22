angular.module('soutenanceplanner.home')

.controller('HomeCtrl', ['$scope', '$log',
	function($scope, $log) {
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
		
	}
])

;