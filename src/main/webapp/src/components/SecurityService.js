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
					data: {
						login : authenticateDTO.login,
						password : ""
					}
				});
			},

			logout : function() {
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/j_spring_security_logout",
				});
			},

			attemptLogin: function(authenticateDTO){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/security/attemptLogin",
					data: authenticateDTO
				});
			},

			hasAuthority: function(userDetails, authority){
				var found = false;
				angular.forEach(userDetails.authorities, function(value, key) {
					if(value.authority === authority){
						found = true;
						return;
					}
				});
				return found;
			}
			
		};

		return SecurityService;
	}
]);