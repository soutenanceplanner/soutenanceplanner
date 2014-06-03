angular.module('soutenanceplanner.account')

.service('AccountService', [ '$http', 'WS_SERVER_URL','transformRequestAsFormPost',

	function($http, WS_SERVER_URL, transformRequestAsFormPost) {

		var AccountService = {

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
			},

			updateUser:function(user){
				return $http({
					method: 'PUT',
					url: WS_SERVER_URL + "/user/"+user.id,
					data : user
				});
			}

		};

		return AccountService;
	}
]);