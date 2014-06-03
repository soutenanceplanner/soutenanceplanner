angular.module('soutenanceplanner.account', []);

angular.module('soutenanceplanner.account')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('account', {
				url: '/account',
				templateUrl: 'account/list.tpl.html',
				controller: 'AccountListCtrl',
				data: {
					ncyBreadcrumbLabel: 'Utilisateurs'
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
				url: '/detail',
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
