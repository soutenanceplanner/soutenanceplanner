/*global angular */
/*jshint unused:false */

angular.module('soutenanceplanner', [
	'templates-app',
	'templates-common',
	'ui.router',
	'ngAnimate',

	//dans cet ordre là pour éviter conflits
	'ui.bootstrap',
	'mgcrea.ngStrap',
	'angularFileUpload',
	'services.i18n',

	//modules
	'soutenanceplanner.home',
	'soutenanceplanner.account'
]);

angular.module('soutenanceplanner')

//INTEG EXTERNE
.value('WS_SERVER_URL', '')

//LOCALHOST
.value('WS_SERVER_URL', '')

.config(['$urlRouterProvider',
	function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
])

.config(['$logProvider',
	function($logProvider) {
		$logProvider.debugEnabled(true);
	}
])

.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.html5Mode(false);
	}
])

//cross origin => TO DELETE
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
	}
])

.run(['$rootScope', '$state', '$stateParams', '$http',
	function($rootScope, $state, $stateParams, $http) {
		$http.defaults.headers.contentType = "application/json; charset=utf-8";
	}
])

.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$log', '$state','i18n',
	function($scope, $rootScope, $location, $log, $state, i18n) {
		$log.debug("MainCtrl");

		$scope.init = function(){

			//i18n
			$rootScope.i18n = i18n;
		};

		$scope.init();
	}
])

.controller('MenuCtrl', ['$rootScope', '$scope', '$log','$state', '$location',
	function($rootScope, $scope, $log, $state, $location) {
		$log.debug("MenuCtrl");
	}
])

;
