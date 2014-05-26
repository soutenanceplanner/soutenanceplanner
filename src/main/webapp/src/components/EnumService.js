angular.module('soutenanceplanner.enum', []);

angular.module('soutenanceplanner.enum')

.service('EnumService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var EnumService = {

			droit: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/enum/droit",
					data: {}
				});
			}

		};

		return EnumService;
	}
]);