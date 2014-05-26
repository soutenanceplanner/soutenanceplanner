angular.module('soutenanceplanner.account', []);

angular.module('soutenanceplanner.account')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('accountAdd', {
			url: '/account/add',
			templateUrl: 'account/add.tpl.html',
			controller: 'AccountAddCtrl'
		});
	}
])

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('accountEdit', {
			url: '/account/edit',
			templateUrl: 'account/edit.tpl.html',
			controller: 'AccountEditCtrl',
			directives : [ "directives" ]
		});
	}
])

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('accountList', {
			url: '/account/list',
			templateUrl: 'account/list.tpl.html',
			controller: 'AccountListCtrl'
		});
	}
])

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('accountShow', {
			url: '/account',
			templateUrl: 'account/show.tpl.html',
			controller: 'AccountShowCtrl'
		});
	}
])

;
