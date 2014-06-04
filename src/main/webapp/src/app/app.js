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
		
		'pascalprecht.translate',
		'ngSanitize',
		'dialogs.main',

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

.run(['$rootScope','$state','$stateParams','$http',
	function($rootScope, $state, $stateParams, $http) {
		$http.defaults.headers.post = {
			'Content-Type': 'application/json'
		};
		//$http.defaults.headers.contentType = "application/x-www-form-urlencoded";
} ])

.controller('MainCtrl',['$rootScope', '$scope', '$log', 'SecurityService', 'i18n','$state',
	function($rootScope, $scope, $log, SecurityService, i18n,$state) {
		$log.debug("MainCtrl");

		$scope.init = function() {
			// i18n
			$rootScope.i18n = i18n;
		};

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			SecurityService.retrieve()
				.success(function(data){
						$log.debug(data);
						$scope.userLogin = data.username;
						if(data.username == null){
							$state.go('login');
						}
					}
			)
			.error(function(data, status, headers, config){
				$state.go('login');
			});
			
			/*if($scope.userLogin == null){
				$state.go('login');
			}*/
			
		});
		
		$scope.init();
} ])


.controller('MenuCtrl', ['$rootScope', '$scope', '$log','$state', '$location', 'SecurityService',
	function($rootScope, $scope, $log, $state, $location, SecurityService) {
		$log.debug("MenuCtrl");

		$scope.logout = function(){
			$scope.$emit('event:logoutRequest');

			SecurityService.logout().then(function() {
				$scope.userLogin = null;
				$rootScope.user = null;
				$state.go('home');
			});
		};
	}
])

.directive('getmenucalendar',['$log','HomeService','SecurityService', function($log,HomeService,SecurityService) {
	var def = {
	template : '{{titre}}<span class="badge pull-right">{{badge}}</span>'+
				'<ul class="nav " ng-repeat="calendrier in calendriers">'+
					'<li><a href="{{calendrier.link}}">{{calendrier.title}}</a></li>'+	
				'</ul><br/>{{calVide}}',
	remplace : true,
	scope: { //permet de ne pas faire de mise à jour du scope ( même nom de variable dans le template ) 
		subscription: '=',
		index: '@'
	},
	link :	function link(scope, element, attrs) {	
		scope.titre = attrs.title ;
		scope.badge = attrs.type;

		//si le type = 1 on récupère les calendrier passés
		if(attrs.type == 1){
			HomeService.getPastCalendars().then(
					function(response){
						$log.debug(response.data);
						scope.calendriers = response.data ;
						if(response.data.length === 0){
							scope.calVide = attrs.erreur ;
						}
					}
				);
		}else	if(attrs.type == 2){
			HomeService.getFuturCalendars().then(
					function(response){
						$log.debug(response.data);
						scope.calendriers = response.data ;
						if(scope.calendriers === null){
							scope.calVide = attrs.erreur ;
						}
				}
			);
		//si le type = 3 on récupère les calendriers de l'user
		}else if (attrs.type == 3){
			HomeService.getCalendars().then(
				function(response){
					$log.debug(response.data);
					scope.calendriers = response.data ;
					if(scope.calendriers === null){
						scope.calVide = attrs.erreur ;
					}
				}
			);	
		}
	}
};
return def ;	
}])

;
