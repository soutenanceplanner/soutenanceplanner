describe('AccountService tester', function() {

	var accountService, httpBackend, WS_SERVER_URL;


	beforeEach(module("soutenanceplanner"));

	beforeEach(inject(function(_$httpBackend_, AccountService, _WS_SERVER_URL_) {
		WS_SERVER_URL = _WS_SERVER_URL_;
		accountService = AccountService;
		httpBackend = _$httpBackend_;
	}));

	it('AccountService', function() {
		expect(accountService).toBeDefined();
	});

	it('AccountService - test', function() {

		expect(accountService.test).toBeDefined();
		httpBackend.expect('POST', WS_SERVER_URL.WebServiceCandidat + "/Test" ).respond();

		var responseStatus;
		accountService.test().then(function(response) {
			responseStatus = response.status;
		});
		httpBackend.flush();
		expect(responseStatus).toBe(200);
	});

});