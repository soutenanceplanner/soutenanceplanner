angular.module('soutenanceplanner.formation', []);

angular.module('soutenanceplanner.formation')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('formation', {
				url: '/formation',
				abstract: true,
				template : '<div ui-view></div>'
			})
			.state('formation.admin', {
				url: '/admin',
				templateUrl: 'formation/admin_list.tpl.html',
				controller: 'FormationAdminListCtrl',
				data: {
					ncyBreadcrumbLabel: 'Formations'
				}
			})
			.state('formation.add', {
				url: '/add',
				views: {
					"@" : {
						templateUrl: 'formation/add.tpl.html',
						controller: 'FormationAddCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Ajout'
				}
			})
			.state('formation.detail', {
				url: '/:id',
				views: {
					"@" : {
						templateUrl: 'formation/detail.tpl.html',
						controller: 'FormationDetailCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Formation {{user.login}}'
				}
			})
			.state('formation.detail.edit', {
				url: '/edit',
				views: {
					"@" : {
						templateUrl: 'formation/edit.tpl.html',
						controller: 'FormationEditCtrl'
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
