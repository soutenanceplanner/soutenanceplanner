describe('AccountAddCtrl tester', function() {

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

describe('AccountAdminListCtrl tester', function() {

	var AccountCtrl, scope, httpBackend, callBack, log;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($injector, $controller, $rootScope, _$httpBackend_, $log) {
		scope = $rootScope.$new();

		httpBackend = _$httpBackend_;
		log = $log;
		AccountAdminListCtrl = $controller('AccountAdminListCtrl', {
			$log : log,
			$scope: scope
		});
		callBack = {};
	}));

	it('AccountAdminListCtrl', function() {
		expect(AccountAdminListCtrl).toBeDefined();
	});

});