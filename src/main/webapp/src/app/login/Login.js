angular.module('soutenanceplanner.login', []);

angular.module('soutenanceplanner.login')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'login/login.tpl.html',
				controller: 'LoginCtrl',
				data: {
					ncyBreadcrumbLabel: 'Connexion'
				}
			})
			.state('loginRequired', {
				url: '/401',
				templateUrl: 'login/401.tpl.html',
				controller: 'LoginCtrl',
				data: {
					ncyBreadcrumbLabel: 'Connexion'
				}
			})
		;
	}
])

;
