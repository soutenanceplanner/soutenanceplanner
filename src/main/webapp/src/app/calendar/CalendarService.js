angular.module('soutenanceplanner.calendar')

.service('CalendarService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var CalendarService = {

			createCalendar:function(calendar, user){
				var timeSlots = [];
				angular.forEach(calendar.time_slot_list, function(value, key) {
					timeSlots.push({
						beginningHour : value.beginning,
						endingHour : value.ending
					});
				});
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/calendar/new",
					data: {
						title : calendar.title,
						beginningDate : calendar.beginning_date,
						endingDate : calendar.ending_date,
						duration : calendar.duration,
						formationId : calendar.formation.id,
						link : calendar.link,
						timeSlots : timeSlots,
						userId : user.id
					}
				});
			},
			
			getCalendar:function(calendar){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/"+calendar.id,
				});
			},

			deleteCalendar:function(id){
				return $http({
					method: 'DELETE',
					url: WS_SERVER_URL + "/calendar/"+id,
				});
			},

			listCalendar:function(user){
				console.log(user);
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list/"+user.login,
				});
			}

		};

		return CalendarService;
	}
]);
