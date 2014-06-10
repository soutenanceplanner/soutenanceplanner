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
			.state('calendar.detail.oral.add', {
				url: '/add',
				views: {
					"@" : {
						templateUrl: 'oral/add.tpl.html',
						controller: 'OralAddCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Ajout'
				}
			})
			.state('calendar.detail.oral.detail', {
				url: '/:oral_id',
				views: {
					"@" : {
						templateUrl: 'oral/detail.tpl.html',
						controller: 'OralDetailCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Soutenance {{oral.name}}'
				}
			})
			.state('calendar.detail.oral.detail.edit', {
				url: '/edit',
				views: {
					"@" : {
						templateUrl: 'oral/edit.tpl.html',
						controller: 'OralEditCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Edition'
				}
			})
		;
	}
])

;
