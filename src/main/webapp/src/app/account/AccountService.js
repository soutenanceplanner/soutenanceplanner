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

			create:function(user){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/user/new",
					data: JSON.stringify(user)
				});
			}

		};

		return AccountService;
	}
]);