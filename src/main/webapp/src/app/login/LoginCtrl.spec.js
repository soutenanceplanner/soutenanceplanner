describe('LoginCtrl tester', function() {

	var loginCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		loginCtrl = $controller('LoginCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('LoginCtrl', function() {
		expect(loginCtrl).toBeDefined();
	});

});