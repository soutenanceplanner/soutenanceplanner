angular.module('soutenanceplanner.account.module', [
	'soutenanceplanner.account'
]);

angular.module('soutenanceplanner.account', []);

angular.module('soutenanceplanner.account')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('account', {
			url: '/account',
			template: '<div ui-view></div>',
			abstract : true
		});
	}
])

;
