angular.module('soutenanceplanner.calendar')

.controller('CalendarCtrl', [ '$scope', '$log', function($scope, $log) {

	$log.debug('CalendarCtrl');

	$scope.durations = [ {
		value : 0.5,
		text : "30min"
	}, {
		value : 0.75,
		text : "40min"
	}, {
		value : 1,
		text : "1h"
	} ];

	$scope.hours = [ {
		value : 7,
		text : "7h"
	}, {
		value : 8,
		text : "8h"
	}, {
		value : 9,
		text : "9h"
	}, {
		value : 10,
		text : "10h"
	}, {
		value : 11,
		text : "11h"
	}, {
		value : 12,
		text : "12h"
	}, {
		value : 13,
		text : "13h"
	}, {
		value : 14,
		text : "14h"
	}, {
		value : 15,
		text : "15h"
	}, {
		value : 16,
		text : "16h"
	}, {
		value : 17,
		text : "17h"
	}, {
		value : 18,
		text : "18h"
	}, {
		value : 19,
		text : "19h"
	}, {
		value : 20,
		text : "20h"
	} ];

	$scope.time_slot_default = {
		beginning : 8,
		ending : 18
	};

	$scope.time_slot_list = [ {
		beginning : 8,
		ending : 12
	}, {
		beginning : 14,
		ending : 18
	} ];
	
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	$scope.event1 = [ {
		title : 'Title',
		start : new Date(y, m, d - 5),
		end : new Date(y, m, d + 5)
	} ];
	$scope.new_calendar = [ $scope.event1 ];

	$scope.add_time_slot = function() {
		$scope.time_slot_list.push({
			beginning : 8,
			ending : 18
		});
	};

	$scope.update_calendar = function() {
		/*
		 * var date = new Date(); var d = date.getDate(); var m =
		 * date.getMonth(); var y = date.getFullYear(); $scope.new_calendar =
		 * [{title: $scope.title,start: new Date(y, m, d-5),end: new Date(y, m,
		 * d+5)}];
		 */
		$scope.event1 = [ {
			title : 'Title',
			start : new Date(y, m, d - 1),
			end : new Date(y, m, d + 1)
		} ];
	};

}

]);
