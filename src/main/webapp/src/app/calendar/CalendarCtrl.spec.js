describe('CalendarAddCtrl tester', function() {

	var calendarHtml, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		calendarHtml = $controller('CalendarAddCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('CalendarAddCtrl', function() {
		expect(calendarHtml).toBeDefined();
	});

});