angular.module('soutenanceplanner.login')

.controller('LoginCtrl', ['$scope', '$log', '$location',
	function($scope, $log, $location) {
		$log.debug('LoginCtrl');

		$scope.verify = function () {
			alert("Connected !");
			$location.path( "/home" );
		};
	}
])

;