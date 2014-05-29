angular.module('soutenanceplanner.home', []);

angular.module('soutenanceplanner.home')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'home/home.tpl.html',
				controller: 'HomeCtrl',
				data: {
					ncyBreadcrumbLabel: 'Accueil'
				}
			})
		;
	}
])

;
