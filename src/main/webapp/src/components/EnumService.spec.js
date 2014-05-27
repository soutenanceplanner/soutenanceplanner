describe('EnumService tester', function() {

	var enumService, httpBackend, WS_SERVER_URL;


	beforeEach(module("soutenanceplanner"));

	beforeEach(inject(function(_$httpBackend_, EnumService, _WS_SERVER_URL_) {
		WS_SERVER_URL = _WS_SERVER_URL_;
		enumService = EnumService;
		httpBackend = _$httpBackend_;
	}));

	it('EnumService', function() {
		expect(enumService).toBeDefined();
	});

	it('enumService - droit', function() {

		expect(enumService.droit).toBeDefined();
		httpBackend.expect('GET', WS_SERVER_URL + "/enum/droit" ).respond();

		var responseStatus;
		enumService.droit().then(function(response) {
			responseStatus = response.status;
		});
		httpBackend.flush();
		expect(responseStatus).toBe(200);
	});

});