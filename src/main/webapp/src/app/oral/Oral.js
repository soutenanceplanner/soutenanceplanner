angular.module('soutenanceplanner.oral', []);

angular.module('soutenanceplanner.oral')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('calendar.detail.oral', {
				url: '/oral',
				views: {
					"@" : {
						templateUrl: 'oral/list.tpl.html',
						controller: 'OralListCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Soutenances'
				}
			})
		;
	}
])

;
