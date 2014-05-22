describe('LoginCtrl tester', function() {

	var calendarCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		calendarCtrl = $controller('LoginCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('LoginCtrl', function() {
		expect(calendarCtrl).toBeDefined();
	});

});