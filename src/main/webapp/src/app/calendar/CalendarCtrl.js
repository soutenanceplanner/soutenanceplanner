angular.module('soutenanceplanner.calendar')

.controller('CalendarCtrl', [ '$scope', '$log', function($scope, $log) {
	
	$log.debug('CalendarCtrl');
	
	var hours = [];
	var time_slot_default = '<select></select><span> à </span><select></select>';
	
	$scope.time_slot_list = [
		'<select></select>'
	];
	
	$scope.add_time_slot = function() {
		//$scope.time_slot_list.push('');  
	};
	
}

]);
