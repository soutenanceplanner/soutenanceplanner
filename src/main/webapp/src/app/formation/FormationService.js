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
			
			getFormation:function(id){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/formation/"+id,
				});
			},

			deleteFormation:function(id){
				return $http({
					method: 'DELETE',
					url: WS_SERVER_URL + "/formation/"+id,
				});
			},

			adminListFormation:function(){
				return $http({
					method: 'GET',
					url: WS_SERVER_URL + "/formation/admin_list",
				});
			},

			updateFormation:function(formation){
				return $http({
					method: 'PUT',
					url: WS_SERVER_URL + "/formation/"+formation.id,
					data : formation
				});
			}

		};

		return FormationService;
	}
]);