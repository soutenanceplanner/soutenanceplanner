angular.module('soutenanceplanner.formation', []);

angular.module('soutenanceplanner.formation')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('formationAdd', {
			url: '/formation/add',
			templateUrl: 'formation/add.tpl.html',
			controller: 'FormationAddCtrl'
		}).state('formationEdit', {
			url: '/formation/edit',
			templateUrl: 'formation/edit.tpl.html',
			controller: 'FormationEditCtrl',
			directives : [ "directives" ]
		}).state('formationList', {
			url: '/formation/list',
			templateUrl: 'formation/list.tpl.html',
			controller: 'FormationListCtrl'
		}).state('formationShow', {
			url: '/formation',
			templateUrl: 'formation/show.tpl.html',
			controller: 'FormationShowCtrl'
		});
	}
])

;
