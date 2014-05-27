/**
 * @author Pierre Evers
 */

angular.module('soutenanceplanner.calendar', []);

angular.module('soutenanceplanner.calendar')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('calendarAdd', {
			url: '/calendar/add',
			templateUrl: 'calendar/add.tpl.html',
			controller: 'CalendarCtrl'
		});
	}
])

;
