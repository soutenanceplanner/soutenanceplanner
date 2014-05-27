angular.module('soutenanceplanner.calendar')

.controller('CalendarCtrl',
		[ '$scope', '$log', '$filter', function($scope, $log, $filter) {

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
			
			$scope.new_calendar = { 
				title : 'New calendar',
				formation : '',
				beginning_date : new Date(),
				ending_date : new Date(),
				duration : '',
				time_slot_list : [ {
					beginning : 8,
					ending : 18
				}]
			};
			
			/* event sources array */
			$scope.eventSources = [[{
				title : $scope.new_calendar.title,
				start : new Date($scope.new_calendar.beginning_date),
				end : new Date($scope.new_calendar.ending_date),
				editable : true
			}]];

			/* Change View */
			$scope.renderCalendar = function(calendar) {
				calendar.fullCalendar('render');
			};

			/* Change View */
			$scope.refetchCalendar = function(calendar) {
				$scope.eventSources[0][0].title = $scope.new_calendar.title;
				$scope.eventSources[0][0].start = new Date($scope.new_calendar.beginning_date);
				$scope.eventSources[0][0].end = new Date($scope.new_calendar.ending_date);
				calendar.fullCalendar('rerenderEvents');
			};
			/* config object */
			$scope.uiConfig = {
				calendar : {
					height : 450,
					editable : true,
					header : {
						left : 'prev,next today',
						center : 'title',
						right : 'month,agendaWeek,agendaDay'
					}
				}
			};

			$scope.add_time_slot = function() {
				$scope.new_calendar.time_slot_list.push({
					beginning : 8,
					ending : 18
				});
			};

		}

		]);
