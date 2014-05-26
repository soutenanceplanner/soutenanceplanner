describe('AccountCtrl tester', function() {

	var AccountCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		AccountAddCtrl = $controller('AccountAddCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('AccountAddCtrl', function() {
		expect(AccountAddCtrl).toBeDefined();
	});

});