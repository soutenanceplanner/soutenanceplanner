describe('LoginService tester', function() {

	var loginService, httpBackend, WS_SERVER_URL;


	beforeEach(module("soutenanceplanner"));

	beforeEach(inject(function(_$httpBackend_, LoginService, _WS_SERVER_URL_) {
		WS_SERVER_URL = _WS_SERVER_URL_;
		loginService = LoginService;
		httpBackend = _$httpBackend_;
	}));

	it('LoginService', function() {
		expect(loginService).toBeDefined();
	});

	it('LoginService setOldPath', function() {
		expect(loginService.setOldPath).toBeDefined();
	});

	it('LoginService getOldPath', function() {
		expect(loginService.getOldPath).toBeDefined();
	});

});