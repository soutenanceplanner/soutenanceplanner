angular.module('soutenanceplanner.oral')

.service('OralService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var OralService = {

			createOral:function(oral){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/oral/new",
					data: oral
				});
			},

			getOral:function(id){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/oral/"+id,
				});
			},

			deleteOral:function(id){
				return $http({
					method: 'DELETE',
					url: WS_SERVER_URL + "/oral/"+id,
				});
			},

			listOral:function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/oral/list",
				});
			},

			listUserOral:function(user_id){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/oral/list/"+user_id,
				});
			},

			updateOral:function(oral){
				return $http({
					method: 'PUT',
					url: WS_SERVER_URL + "/oral/"+oral.id,
					data : oral
				});
			}

		};

		return OralService;
	}
]);