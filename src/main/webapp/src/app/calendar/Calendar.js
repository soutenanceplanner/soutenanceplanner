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
				templateUrl: 'calendar/list.tpl.html',
				controller: 'CalendarListCtrl',
				data: {
					ncyBreadcrumbLabel: 'Calendriers'
				}
			})
			.state('calendar.admin', {
				url: '/admin',
				templateUrl: 'calendar/admin_list.tpl.html',
				controller: 'CalendarAdminListCtrl',
				data: {
					ncyBreadcrumbLabel: 'Calendriers'
				}
			})
			.state('calendar.add', {
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
			.state('calendar.detail.edit', {
				url: '/edit',
				views: {
					"@" : {
						templateUrl: 'calendar/edit.tpl.html',
						controller: 'CalendarEditCtrl'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Edition',
				}
			})
		;
	}
])

;
