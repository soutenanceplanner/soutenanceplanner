describe('SecurityService tester', function() {

	var securityService, httpBackend, WS_SERVER_URL;


	beforeEach(module("soutenanceplanner"));

	beforeEach(inject(function(_$httpBackend_, SecurityService, _WS_SERVER_URL_) {
		WS_SERVER_URL = _WS_SERVER_URL_;
		securityService = SecurityService;
		httpBackend = _$httpBackend_;
	}));

	it('SecurityService', function() {
		expect(securityService).toBeDefined();
	});

	it('SecurityService - retrieve', function() {

		expect(securityService.retrieve).toBeDefined();
		httpBackend.expect('GET', WS_SERVER_URL + "/security/retrieve" ).respond();

		var responseStatus;
		securityService.retrieve().then(function(response) {
			responseStatus = response.status;
		});
		httpBackend.flush();
		expect(responseStatus).toBe(200);
	});

	it('SecurityService - authenticate', function() {

		var authenticateDTO = {
			login : "dd",
			password: "dd"
		};

		expect(securityService.authenticate).toBeDefined();
		httpBackend.expect('POST', WS_SERVER_URL + "/security/authenticate", {login : "dd", password: ""} ).respond();

		var responseStatus;
		securityService.authenticate(authenticateDTO).then(function(response) {
			responseStatus = response.status;
		});
		httpBackend.flush();
		expect(responseStatus).toBe(200);
	});

});