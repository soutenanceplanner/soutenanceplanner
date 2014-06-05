angular.module('soutenanceplanner.account', []);

angular.module('soutenanceplanner.account')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('account', {
				url: '/account',
				abstract: true,
				template : '<div ui-view></div>'
			})
			.state('account.admin', {
				url: '/admin',
				templateUrl: 'account/admin_list.tpl.html',
				controller: 'AccountAdminListCtrl',
				data: {
					ncyBreadcrumbLabel: 'Utilisateurs'
				}
			})
			.state('account.current', {
				url: '/current',
				views: {
					"@" : {
						templateUrl: 'account/detail.tpl.html',
						controller: 'AccountCurrentUserDetailCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Utilisateur {{user.login}}'
				}
			})
			.state('account.add', {
				url: '/add',
				views: {
					"@" : {
						templateUrl: 'account/add.tpl.html',
						controller: 'AccountAddCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Ajout'
				}
			})
			.state('account.detail', {
				url: '/:id',
				views: {
					"@" : {
						templateUrl: 'account/detail.tpl.html',
						controller: 'AccountDetailCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Utilisateur {{user.login}}'
				}
			})
			.state('account.detail.edit', {
				url: '/edit',
				views: {
					"@" : {
						templateUrl: 'account/edit.tpl.html',
						controller: 'AccountEditCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Edition'
				},
				directives : [ "directives" ]
			})
		;
	}
])

;
