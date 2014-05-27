describe('FactoryService tester', function() {

	var factoryService, httpBackend, WS_SERVER_URL;


	beforeEach(module("soutenanceplanner"));

	beforeEach(inject(function(_$httpBackend_, FactoryService, _WS_SERVER_URL_) {
		WS_SERVER_URL = _WS_SERVER_URL_;
		factoryService = FactoryService;
		httpBackend = _$httpBackend_;
	}));

	it('FactoryService', function() {
		expect(factoryService).toBeDefined();
	});

	it('FactoryService - user', function() {

		expect(factoryService.user).toBeDefined();
		httpBackend.expect('GET', WS_SERVER_URL + "/factory/user" ).respond();

		var responseStatus;
		factoryService.user().then(function(response) {
			responseStatus = response.status;
		});
		httpBackend.flush();
		expect(responseStatus).toBe(200);
	});

});