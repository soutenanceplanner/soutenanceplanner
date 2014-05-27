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

});