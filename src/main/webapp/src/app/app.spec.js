describe('MainCtrl', function() {
	var mainCtrl, location, scope, log, callBack, i18n_, state;

	beforeEach(module('soutenanceplanner'));

	beforeEach(inject(function($controller, $rootScope, $location, $log, $state, i18n) {
		location = $location;
		log = $log;
		scope = $rootScope.$new();
		i18n_ = i18n;
		state = $state;
		mainCtrl = $controller('MainCtrl', {
			$location: location,
			$rootScope : scope,
			$scope: scope,
			$log: log,
			$state : state,
			i18n : i18n_
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
