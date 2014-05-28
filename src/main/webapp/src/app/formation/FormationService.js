angular.module('soutenanceplanner.formation')

.service('FormationService', [ '$http', 'WS_SERVER_URL',

	function($http, WS_SERVER_URL) {

		var FormationService = {

				createFormation:function(formation){
					return $http({
						method: 'POST',
						url: WS_SERVER_URL + "/formation/new",
						data: formation
					});
				},

				getFormation:function(formation){
					return $http({
						method: 'GET',
						url: WS_SERVER_URL + "/formation/"+formation.id,
					});
				},

				deleteFormation:function(formation){
					return $http({
						method: 'DELETE',
						url: WS_SERVER_URL + "/formation/"+formation.id,
					});
				},

				listFormation:function(){
					return $http({
						method: 'GET',
						url: WS_SERVER_URL + "/formation/list",
					});
				}

		};

		return FormationService;
	}
]);