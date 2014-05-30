angular.module('soutenanceplanner.security', []);

angular.module('soutenanceplanner.security')

.service('SecurityService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var SecurityService = {

			retrieve: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/security/retrieve",
					data: {}
				});
			},

			authenticate: function(login, password){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/security/authenticate",
					data: {
						login : login,
						password : password
					}
				});
			}

		};

		return SecurityService;
	}
]);