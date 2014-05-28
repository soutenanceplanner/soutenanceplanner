xdescribe('FormationCtrl tester', function() {

	var FormationCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		FormationAddCtrl = $controller('FormationAddCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('FormationAddCtrl', function() {
		expect(FormationAddCtrl).toBeDefined();
	});

});