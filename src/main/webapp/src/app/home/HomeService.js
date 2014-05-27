angular.module('soutenanceplanner.home')

.service('HomeService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var HomeService = {

			getCalendars: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/user/getCalendars/",
					data: {"User_ID":'123456'}
				});
			},

			getCalendarAVenir: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/user/getCalendarAVenir",
					data: {}
				});
			},

		};

		return HomeService;
	}
]);