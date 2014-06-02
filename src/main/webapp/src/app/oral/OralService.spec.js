xdescribe('OralService tester', function() {

	var formationService, httpBackend, WS_SERVER_URL;


	beforeEach(module("soutenanceplanner"));

	beforeEach(inject(function(_$httpBackend_, OralService, _WS_SERVER_URL_) {
		WS_SERVER_URL = _WS_SERVER_URL_;
		formationService = OralService;
		httpBackend = _$httpBackend_;
	}));

	it('OralService', function() {
		expect(formationService).toBeDefined();
	});

	it('OralService - test', function() {

		expect(formationService.test).toBeDefined();
		httpBackend.expect('POST', WS_SERVER_URL + "/Test" ).respond();

		var responseStatus;
		formationService.test().then(function(response) {
			responseStatus = response.status;
		});
		httpBackend.flush();
		expect(responseStatus).toBe(200);
	});

});