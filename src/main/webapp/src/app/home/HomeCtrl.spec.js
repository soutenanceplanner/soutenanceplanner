describe('HomeCtrl tester', function() {

	var homeCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		homeCtrl = $controller('HomeCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('HomeCtrl', function() {
		expect(homeCtrl).toBeDefined();
	});

});