angular.module('soutenanceplanner.account')

.service('AccountService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var AccountService = {

			test: function(){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/Test",
					data: {}
				});
			},

			oups: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/oups",
					data: {}
				});
			},

			create:function(login, password, mail, flag){
				return $http({
					method: 'POST',
					url: WS_SERVER_URL + "/user/new",
					data: {
						login : login,
						password : password,
						mail : mail,
						flag : flag
					}
				});
			}

		};

		return AccountService;
	}
]);