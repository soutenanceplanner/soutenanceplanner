angular.module('soutenanceplanner.formation')

.service('FormationService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var FormationService = {

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

		};

		return FormationService;
	}
]);