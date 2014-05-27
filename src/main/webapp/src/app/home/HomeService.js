angular.module('soutenanceplanner.home')

.service('HomeService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var HomeService = {

			getCalendars: function(){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/calendar/getCalendars/",
					data: "123456"
				});
			},

			getFuturesCalendars: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/calendar/getFuturesCalendars",
					data: {}
				});
			},

		};

		return HomeService;
	}
]);