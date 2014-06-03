angular.module('soutenanceplanner.login')

.service('LoginService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var oldPath = "/";//Default to home

		var LoginService = {

			setOldPath: function(oldPathToSave){
				oldPath = oldPathToSave;
			},

			getOldPath: function(){
				var temp = oldPath;
				oldPath = "/";
				return temp;
			}
		};

		return LoginService;
	}
]);