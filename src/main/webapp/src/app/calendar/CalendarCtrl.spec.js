describe('CalendarCtrl tester', function() {

	var calendarHtml, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		calendarHtml = $controller('CalendarCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('CalendarCtrl', function() {
		expect(calendarHtml).toBeDefined();
	});

});