describe('MainCtrl', function() {
	var mainCtrl, scope, log, callBack, i18n_, securityService;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($controller, $rootScope, $log, i18n, SecurityService) {
		log = $log;
		scope = $rootScope.$new();
		i18n_ = i18n;
		securityService = SecurityService;
		mainCtrl = $controller('MainCtrl', {
			$rootScope : scope,
			$scope: scope,
			$log: log,
			i18n : i18n_,
			SecurityService : securityService
		});
		callBack = {};
	}));

	it('MainCtrl', inject(function() {
		expect(mainCtrl).toBeDefined();
	}));

});

describe('MenuCtrl', function() {
	var menuCtrl, location, state, scope, log, callBack;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($controller, $rootScope, $log, $state, $location) {
		location = $location;
		log = $log;
		scope = $rootScope.$new();
		state = $state;
		menuCtrl = $controller('MenuCtrl', {
			$location: location,
			$rootScope : scope,
			$scope: scope,
			$log: log,
			$state : state
		});
		callBack = {};
	}));

	it('MenuCtrl', inject(function() {
		expect(menuCtrl).toBeDefined();
	}));
});
