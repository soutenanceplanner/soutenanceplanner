angular.module('soutenanceplanner.calendar')

.service('CalendarService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var CalendarService = {

			createCalendar:function(calendar){
				console.log(calendar);
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/calendar/new",
					data: calendar
				});
			},

			getCalendar:function(calendar){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/"+calendar.id,
				});
			},

			deleteCalendar:function(calendar){
				return $http({
					method: 'DELETE',
					url: WS_SERVER_URL + "/calendar/"+calendar.id,
				});
			},

			listCalendar:function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list",
				});
			}

		};

		return CalendarService;
	}
]);