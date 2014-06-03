angular.module('soutenanceplanner.home')

.controller('HomeCtrl',['$scope','$log','AccountService','HomeService','$translate','dialogs',
	function($scope, $log, AccountService, HomeService,$translate,dialogs) {	
		$log.debug('HomeCtrl');			

		$scope.open = function () {
			dialogs.error("Message d'erreur !!!","contenu du message !!");
		};

} ]);