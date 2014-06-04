angular.module('soutenanceplanner.oral')

.controller('OralAddCtrl', ['$scope', '$log', '$state', 'OralService', 'FactoryService',
	function($scope, $log, $state, OralService, FactoryService) {
		$log.debug('OralAddCtrl');

	}
])

.controller('OralEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', 'OralService',
	function($scope, $location, $log, $state, $stateParams, OralService) {
		$log.debug('OralEditCtrl');

	}
])

.controller('OralListCtrl', ['$scope', '$log', '$state', '$stateParams', 'OralService', 'CalendarService', 'SecurityService',
	function($scope, $log, $state, $stateParams, OralService, CalendarService, SecurityService) {
		$log.debug('OralListCtrl');

		// BEGIN DATA
		/*
		$scope.user = {
			id              : '1',
			flag            : 'ADMIN',
			login           : 'admin1',
			mail            : 'admin1@soutenance.fr',
			password        : 'admin1'
		};

		$scope.calendar = {
			id              : '1',
			beginning_date  : '2014-06-02 00:00:00',
			duration        : '1.0',
			ending_date     : '2014-06-06 00:00:00',
			link            : '20140602',
			title           : 'Soutenance de stage',
			formation_id    : '1',
			user_id         : '1'
		};

		$scope.time_slots = [
			{
				id              : '1',
				beginning_hour  : '08:00:00',
				ending_hour     : '12:00:00',
				calendar_id     : '1'
			},
			{
				id              : '2',
				beginning_hour  : '14:00:00',
				ending_hour     : '18:00:00',
				calendar_id     : '1'
			}
		];

		$scope.orals = [
			{
				id              : '1',
				beginningHour   : '2014-06-02 08:00:00',
				participants    : 'prof1, prof2, tuteur',
				title           : 'Présentation Etudiant1',
				calendar_id     : '1',
				user_id         : '1'
			},
			{
				id              : '1',
				beginningHour   : '2014-06-02 10:00:00',
				participants    : 'prof2, tuteur',
				title           : 'Présentation Etudiant2',
				calendar_id     : '1',
				user_id         : '1'
			},
			{
				id              : '1',
				beginningHour   : '2014-06-02 11:00:00',
				participants    : 'prof2, tuteur',
				title           : 'Présentation Etudiant3',
				calendar_id     : '1',
				user_id         : '2'
			}
		];

		$scope.formations = [
			{
				id              : '1',
				name            : 'L3 Info'
			},
			{
				id              : '2',
				name            : 'M1 Info'
			},
			{
				id              : '3',
				name            : 'M2 ID'
			},
			{
				id              : '4',
				name            : 'M2 SILI'
			}
		];
		*/
		// END DATA
		
		$scope.init = function(){
			$scope.user_id = 1 ;

			// Récupération du user connecté
			SecurityService.retrieveUser().then(
				function(response){
					$scope.user = response.data;
					$log.debug(response.data);
				}
			);

			// Récupération de l'id du calendrier passé en paramètre
			$scope.calendar_id = $stateParams.id;

			// Récupération du calendrier
			/*
			CalendarService.getCalendar($stateParams.id).then(
				function(response){
					$scope.calendar = response.data;
					$log.debug(response.data);
				}
			);
			*/

			OralService.listUserOral($scope.user_id, $scope.calendar_id).then(
				function(response){
					$scope.orals = response.data;
					$log.debug(response.data);
				}
			);
		};

		//init
		$scope.init();

		/*
		$scope.uiConfig = {
			calendar : {
				height : 450,
				editable : true,
				header : {
					left : 'prev,next today',
					center : 'title',
					right : 'month,agendaWeek,agendaDay'
				},
				weekends : false,
				allDaySlot : false,
				minTime : 7,
				maxTime : 20,
				eventResize : function(event, dayDelta, minuteDelta, revertFunc) {
					//$scope.initializeConstraints(event);
				},
				eventClick : function(event, jsEvent, view) {
					alert(event.title);
				}
			}
		};
		*/
		
		/* config calendar object */
		/*
		$scope.uiConfig = {
			calendar:{
				height: 450,
				editable: true,
				header:{
					left: 'prev,next today',
					center: 'title',
					right: 'today prev,next'
				},
				weekends : false
				//eventClick: $scope.alertOnEventClick,
				//eventDrop: $scope.alertOnDrop,
				//eventResize: $scope.alertOnResize
			}
		};
		*/
	}
])

.controller('OralDetailCtrl', ['$scope', '$log', '$stateParams', 'OralService',
	function($scope, $log, $stateParams, OralService) {
		$log.debug('OralDetailCtrl');
	}
])

;
