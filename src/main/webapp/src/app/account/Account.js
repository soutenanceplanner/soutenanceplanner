angular.module('soutenanceplanner.account', []);

angular.module('soutenanceplanner.account')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('accountAdd', {
			url: '/account/add',
			templateUrl: 'account/add.tpl.html',
			controller: 'AccountAddCtrl'
		}).state('accountEdit', {
			url: '/account/edit/:id',
			templateUrl: 'account/edit.tpl.html',
			controller: 'AccountEditCtrl',
			directives : [ "directives" ]
		}).state('accountList', {
			url: '/account/list',
			templateUrl: 'account/list.tpl.html',
			controller: 'AccountListCtrl'
		}).state('accountShow', {
			url: '/account/show/:id',
			templateUrl: 'account/show.tpl.html',
			controller: 'AccountShowCtrl'
		});
	}
])

;
