angular.module('soutenanceplanner.factory', []);

angular.module('soutenanceplanner.factory')

.service('FactoryService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var FactoryService = {

			user: function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/factory/user",
					data: {}
				});
			}

		};

		return FactoryService;
	}
]);