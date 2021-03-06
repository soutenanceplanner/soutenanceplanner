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
		
		//ng-table
		'ngTable',

		//ng-clip
		'ngClipboard',
		
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

//LIVRABLE
//.value('WS_SERVER_URL', 'http://localhost:8082/soutenanceplanner_back')

// LOCALHOST
.value('WS_SERVER_URL', 'http://localhost:8082/soutenanceplanner')

.config([ '$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
} ])

.config([ '$logProvider', function($logProvider) {
	$logProvider.debugEnabled(false);
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
		minDate : new Date(),
		autoclose : true
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

//Ng-Clip config
.config(['ngClipProvider', function(ngClipProvider) {
	ngClipProvider.setPath("assets/ZeroClipboard.swf");
}])

.run(['$rootScope','$state','$stateParams','$http', 'LoadService',
	function($rootScope, $state, $stateParams, $http, LoadService) {
		$http.defaults.headers.post = {
			'Content-Type': 'application/json'
		};
		//$http.defaults.headers.contentType = "application/x-www-form-urlencoded";


		//ré-init loadModal à chaque changement de state
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                LoadService.hideLoad();
            }
        );
} ])

.controller('MainCtrl',['$rootScope', '$scope', '$log', '$modal', 'SecurityService', 'i18n','CalendarService', 'LoadService',
	function($rootScope, $scope, $log, $modal, SecurityService, i18n,CalendarService, LoadService) {
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
						CalendarService.getPresentCalendars().then(
								function(response){
									$scope.presentCalendars = response.data ;
								}
						);
						CalendarService.getInscriptionCalendars().then(
								function(response){
									$scope.inscriptionCalendars = response.data ;
									$log.debug(response.data);
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

		// ---- Modal de chargement ----- //
		$scope.loadingModal = $modal(
                {
                scope: $scope,
                animation : "am-fade-and-slide-top",
                template: "loading.tpl.html",
                placement: "center",
                backdrop: "static",
                show: false
                }
            );

        $scope.$on('event:showLoad', function () {
            $scope.loadingModal.$promise.then($scope.loadingModal.show);
        });

        $scope.$on('event:hideLoad', function () {
            $scope.loadingModal.hide();
        });

        //-------------------------//

		$scope.init();
} ])


.controller('MenuCtrl', ['$rootScope', '$scope', '$log','$state', '$location', '$stateParams', 'SecurityService','CalendarService', 'LoadService',
	function($rootScope, $scope, $log, $state, $location, $stateParams, SecurityService,CalendarService, LoadService) {
		$log.debug("MenuCtrl");

		$scope.logout = function(){
			LoadService.showLoad();
			$rootScope.$broadcast('event:logoutRequest');
		};
		
		
	}
])

.service('LoadService', [ '$rootScope',

    function($rootScope) {

        $rootScope.isLoadModalOpened = false;

        var LoadService = {

            showLoad : function(){
                $rootScope.isLoadModalOpened = true;
                $rootScope.$broadcast('event:showLoad');
            },

            hideLoad : function(){
                if ($rootScope.isLoadModalOpened === true){
                    $rootScope.isLoadModalOpened = false;
                    $rootScope.$broadcast('event:hideLoad');
                }
            }
        };

        return LoadService;
    }
])
;
