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

			retrieveUser: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/security/retrieveUser",
					data: {}
				});
			},

			authenticate: function(authenticateDTO){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/security/authenticate",
					data: authenticateDTO
				});
			},

			logout : function() {
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/j_spring_security_logout",
				});
			}
		};

		return SecurityService;
	}
]);