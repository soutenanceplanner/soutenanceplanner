angular.module('soutenanceplanner.account')

.service('AccountService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var AccountService = {

			oups: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/oups",
					data: {}
				});
			},

			createUser:function(user){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/user/new",
					data: user
				});
			},

			getUser:function(id){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/user/"+id,
				});
			},

			deleteUser:function(id){
				return $http({
					method: 'DELETE',
					url: WS_SERVER_URL + "/user/"+id,
				});
			},

			listUser:function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/user/list",
				});
			}

		};

		return AccountService;
	}
]);