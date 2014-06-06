angular.module('soutenanceplanner.home')

.controller('HomeCtrl',['$scope','$log','AccountService','HomeService', '$alert', '$sce',
                        function($scope, $log, AccountService, HomeService, $alert, $sce) {	
	$log.debug('HomeCtrl');			
	$scope.alert = {
			"title": "Holy guacamole!",
			"content": $sce.trustAsHtml("Best check yo self, you're not looking too good."),
			"type": "success"
	};
//	Service usage
	var myAlert = $alert({title: 'Holy guacamole!', content: 'Using $modal service', placement: 'top', type: 'warning', show: false});
	$scope.showAlert = function() {
		myAlert.show(); // or myAlert.$promise.then(myAlert.show) if you use an external html template
	};

} 

]);

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
			item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
};