angular.module('soutenanceplanner.home', []);

angular.module('soutenanceplanner.home')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: 'home/home.tpl.html',
			controller: 'HomeCtrl'
		});
	}
])

;
