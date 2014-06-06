/*global angular */
/*jshint unused:false */

angular.module('soutenanceplanner', [ 
		'templates-app',
		'templates-common',
		'ui.router',
		'ngAnimate',
		'ngCookies',
		'ui.calendar',
		'ncy-angular-breadcrumb',

		// dans cet ordre là pour éviter conflits
		'ui.bootstrap',
		'mgcrea.ngStrap', 

		'angularFileUpload',
		'services.i18n',
		
		// Commons
		'soutenanceplanner.factory',
		'soutenanceplanner.enum',
		'soutenanceplanner.security',

		// modules
		'soutenanceplanner.home',
		'soutenanceplanner.calendar',
		'soutenanceplanner.login', 
		'soutenanceplanner.account',
		'soutenanceplanner.formation',
		'soutenanceplanner.oral'
]);

angular.module('soutenanceplanner')

// INTEG EXTERNE
//.value('WS_SERVER_URL','http://soutenanceplanner.m2sili.cloudbees.net')

// LOCALHOST
.value('WS_SERVER_URL', 'http://localhost:8082/soutenanceplanner')

.config([ '$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
} ])

.config([ '$logProvider', function($logProvider) {
	$logProvider.debugEnabled(true);
} ])

.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(false);
} ])

// cross origin => TO DELETE
.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
	// $httpProvider.defaults.useXDomain = true;
	// delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ])

// Breadcrumb config
.config(function($breadcrumbProvider) {
	$breadcrumbProvider.setOptions({
		prefixStateName: 'home',
		templateUrl: 'breadcrumb.tpl.html'
	});
})

//DatePicker config
.config(function($datepickerProvider) {
	angular.extend($datepickerProvider.defaults, {
		autoclose : true,
		minDate : new Date()
	});
})

//Alert config
.config(function($alertProvider) {
  angular.extend($alertProvider.defaults, {
    animation: 'am-fade-and-slide-top',
    placement: 'top-right',
    duration : '3'
  });
})

.run(['$rootScope','$state','$stateParams','$http',
	function($rootScope, $state, $stateParams, $http) {
		$http.defaults.headers.post = {
			'Content-Type': 'application/json'
		};
		//$http.defaults.headers.contentType = "application/x-www-form-urlencoded";
} ])

.controller('MainCtrl',['$rootScope', '$scope', '$log', 'SecurityService', 'i18n','CalendarService',
	function($rootScope, $scope, $log, SecurityService, i18n,CalendarService) {
		$log.debug("MainCtrl");

		$scope.init = function() {
			// i18n
			$rootScope.i18n = i18n;

			SecurityService.retrieve().then(
				function(response){
					if (response.data === ""){
						$scope.userLogin = null;
						$scope.isAdmin = null;
					}
					else {
						var userDetails = response.data;

						//variables pour les templates
						$scope.userLogin = userDetails.username;
						$scope.isAdmin = SecurityService.hasAuthority(userDetails, "ADMIN");

						CalendarService.getPastCalendars().then(
							function(response){
								$scope.pastCalendars = response.data ;
							}
						);
						CalendarService.getFuturCalendars().then(
							function(response){
								$scope.futurCalendars = response.data ;
							}
						);
					}
				}
			);
		};

		//reload MainCtrl when logged
		$scope.$on('event:reloadMainCtrl', function(event, args) {
			//$log.debug("reload");
			$scope.init();
		});

		$scope.init();
} ])


.controller('MenuCtrl', ['$rootScope', '$scope', '$log','$state', '$location', '$stateParams', 'SecurityService','CalendarService',
	function($rootScope, $scope, $log, $state, $location, $stateParams, SecurityService,CalendarService) {
		$log.debug("MenuCtrl");

		$scope.logout = function(){
			$rootScope.$broadcast('event:logoutRequest');
		};
		
		
	}
])

;
