xdescribe('OralCtrl tester', function() {

	var OralCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		OralAddCtrl = $controller('OralAddCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('OralAddCtrl', function() {
		expect(OralAddCtrl).toBeDefined();
	});

});