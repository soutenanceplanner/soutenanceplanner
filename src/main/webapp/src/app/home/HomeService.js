angular.module('soutenanceplanner.home')

.service('HomeService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var HomeService = {

			/**
			 * Service pour retourner une liste de calendrier
			 */
			getCalendars: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/list/",
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
			},

		};

		return HomeService;
	}
]);