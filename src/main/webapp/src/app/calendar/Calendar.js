/**
 * @author Pierre Evers
 */

angular.module('soutenanceplanner.calendar', []);

angular.module('soutenanceplanner.calendar')

.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('calendar', {
				url: '/calendar',
				abstract: true,
				template : '<div ui-view></div>',
				data: {
					ncyBreadcrumbLabel: 'Calendriers'
				}
			})
			.state('calendar.user', {
				url: '/user',
				templateUrl: 'calendar/user_list.tpl.html',
				controller: 'CalendarUserListCtrl'
			})
			.state('calendar.admin', {
				url: '/admin',
				templateUrl: 'calendar/admin_list.tpl.html',
				controller: 'CalendarAdminListCtrl'
			})
			.state('calendar.user.add', {
				url: '/add',
				views: {
					"@" : {
						templateUrl: 'calendar/add.tpl.html',
						controller: 'CalendarAddCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Ajout'
				}
			})
			.state('calendar.detail', {
				url: '/:id/:link',
				views: {
					"@" : {
						templateUrl: 'calendar/detail.tpl.html',
						controller: 'CalendarDetailCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Calendrier - {{calendar.title}}'
				}
			})
		;
	}
])

;
