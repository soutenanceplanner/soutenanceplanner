angular.module('soutenanceplanner.calendar')

.service('CalendarService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var CalendarService = {

			createCalendar:function(calendar, user){
				var timeSlots = [];
				angular.forEach(calendar.timeSlots, function(value, key) {
					timeSlots.push({
						beginningHour : value.beginningHour,
						endingHour : value.endingHour
					});
				});
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/calendar/new",
					data: {
						title : calendar.title,
						beginningDate : calendar.beginningDate,
						endingDate : calendar.endingDate,
						duration : calendar.duration,
						formationId : calendar.formation.id,
						link : calendar.link,
						timeSlots : timeSlots,
						userId : user.id
					}
				});
			},
			
			getCalendar:function(id, link){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/"+id+"/"+link,
				});
			},

			deleteCalendar:function(id){
				return $http({
					method: 'DELETE',
					url: WS_SERVER_URL + "/calendar/"+id,
				});
			},

			adminListCalendar:function(){
				console.log("test");
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/admin_list",
				});
			},

			listCalendar:function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list",
				});
			},

			/**
			 * Service pour retourner une liste de calendrier
			 */
			getCalendars: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list",
					data: {}
				});
			},

			/**
			 * Service pour retourner une liste de calendrier à venir
			 */
			getFuturCalendars: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list_futur",
					data: {}
				});
			},

			/**
			 * Service pour retourner une liste de calendrier à venir
			 */
			getPastCalendars: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list_past",
					data: {}
				});
			}

		};

		return CalendarService;
	}
]);
