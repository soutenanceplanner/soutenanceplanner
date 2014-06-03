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

.run(['$rootScope','$state','$stateParams','$http',
	function($rootScope, $state, $stateParams, $http) {
		$http.defaults.headers.post = {
			'Content-Type': 'application/json'
		};
		//$http.defaults.headers.contentType = "application/x-www-form-urlencoded";
} ])

.controller('MainCtrl',['$rootScope', '$scope', '$log', 'SecurityService', 'i18n',
	function($rootScope, $scope, $log, SecurityService, i18n) {
		$log.debug("MainCtrl");

		$scope.init = function() {
			// i18n
			$rootScope.i18n = i18n;
		};

		//check security
		SecurityService.retrieve();

		$scope.init();
} ])


.controller('MenuCtrl', ['$rootScope', '$scope', '$log','$state', '$location', 'SecurityService',
	function($rootScope, $scope, $log, $state, $location, SecurityService) {
		$log.debug("MenuCtrl");

		$scope.logout = function(){
			$scope.$emit('event:logoutRequest');

			SecurityService.logout().then(function() {
				$rootScope.user = null;
				$state.go('home');
			});
		};
	}
])

.directive('getmenucalendar',['$log','HomeService', function($log,HomeService) {
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
		//on récupère le titre passé en attributs et on le passe au scope du template
		scope.titre = attrs.title ;
		//on passe le type qui correspond au badge
		scope.badge = attrs.type;
		//si le type = 1 on récupère les calendrier passés
		if(attrs.type == 1){
			HomeService.getPastCalendars().then(
					function(response){
						$log.debug(response.data);
						scope.calendriers = response.data ;
					}
				);
		}else	if(attrs.type == 2){
			HomeService.getFuturCalendars().then(
					function(response){
						$log.debug(response.data);
						scope.calendriers = response.data ;
				}
			);
		//si le type = 3 on récupère les calendriers de l'user
		}else if (attrs.type == 3){
			HomeService.getCalendars().then(
					function(response){
						$log.debug(response.data);
						scope.calendriers = response.data ;
					}
				);	
		
		}
		
		if(scope.calendriers == null){
			scope.calVide = attrs.erreur ;
		}
		
	}
};
return def ;	
}])


// I provide a request-transformation method that is used to prepare the outgoing
        // request as a FORM post instead of a JSON packet.
.factory(
            "transformRequestAsFormPost",
            function() {
 
                // I prepare the request data for the form post.
                function transformRequest( data, getHeaders ) {
 
                    var headers = getHeaders();
 
                    headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
 
                    return( serializeData( data ) );
 
                }
 
 
                // Return the factory value.
                return( transformRequest );
 
 
                // ---
                // PRVIATE METHODS.
                // ---
 
 
                // I serialize the given Object into a key-value pair string. This
                // method expects an object and will default to the toString() method.
                // --
                // NOTE: This is an atered version of the jQuery.param() method which
                // will serialize a data collection for Form posting.
                // --
                // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
                function serializeData( data ) {
 
                    // If this is not an object, defer to native stringification.
                    if ( ! angular.isObject( data ) ) {
 
                        return( ( data == null ) ? "" : data.toString() );
 
                    }
 
                    var buffer = [];
 
                    // Serialize each key in the object.
                    for ( var name in data ) {
 
                        if ( ! data.hasOwnProperty( name ) ) {
 
                            continue;
 
                        }
 
                        var value = data[ name ];
 
                        buffer.push(
                            encodeURIComponent( name ) +
                            "=" +
                            encodeURIComponent( ( value == null ) ? "" : value )
                        );
 
                    }
 
                    // Serialize the buffer and clean it up for transportation.
                    var source = buffer
                        .join( "&" )
                        .replace( /%20/g, "+" )
                    ;
 
                    return( source );
 
                }
 
            }
        )

;
