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
		var d1 = new Date();
		d1.setDate(d1.getDate() - 2);
		var d2 = new Date();
		d2.setDate(d1.getDate() + 2);
		$log.debug(d1);
		$log.debug(d2);
		/*
		// BEGIN DATA
		$scope.user = {
			id              : '1',
			flag            : 'ADMIN',
			login           : 'admin1',
			mail            : 'admin1@soutenance.fr',
			password        : 'admin1'
		};

		$scope.calendar = {
			id              : '1',
			beginning_date  : d1,
			duration        : 1.0,
			ending_date     : d2,
			time_slot_list : [ 
				{
					beginning : 8,
					ending : 12
				},
				{
				beginning : 14,
				ending : 18
				}
			],
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
		/* Initialisation des variables */
		$scope.eventSources = [];
		$scope.uiConfig = {};
		$scope.free_slots = {
			color: 'green',
			textColor: 'white',
			events: []
		};

		$scope.unavailableSlots = {
			color: 'red',
			textColor: 'yellow',
			events: []
		};
		// END DATA
		$scope.init = function(){
			// Récupération du calendrier
			CalendarService.getCalendar($stateParams.id, $stateParams.link).then(
				function(response){
					$scope.calendar = response.data.value;

					$scope.orals = $scope.calendar.orals;

					/* Configuration du calendrier */
					$scope.uiConfig = {
						calendar : {
							height : 450,
							editable : true,
							header : {
								left : 'prev,next today',
								center : 'title'
							},
							weekends : false,
							allDaySlot : false,
							minTime : 7,
							maxTime : 20,
							defaultView: 'agendaWeek',
							eventResize : function(event, dayDelta, minuteDelta, revertFunc) {
								//$scope.initializeConstraints(event);
							},
							eventClick : function(event, jsEvent, view) {
							}
						}
					};

					var date = new Date();
					var d = date.getDate();
					var m = date.getMonth();
					var y = date.getFullYear();
					/*
					$scope.free_slots = {
						color: 'grey',
						textColor: 'yellow',
						events: []
					};

					$scope.free_slots.events.push(
						{
							type:'party',
							title: 'Lunch',
							start: new Date(y, m, d, 12, 0),
							end: new Date(y, m, d, 14, 0),
							allDay: false
						},
						{
							type:'party',
							title: 'Lunch 2',
							start: new Date(y, m, d, 13, 0),
							end: new Date(y, m, d, 14, 0),
							allDay: false
						}
					);
					*/
					

					/*
					available slots
					unavailableSlots
					reserved slots
					slots unavailable
					*/
					$log.debug("orals");
					$log.debug($scope.orals);
					$scope.generateUnavailableSlots = function() {
						angular.forEach($scope.orals, function(oral, key) {
							var beginningHour = new Date(oral.beginningHour);
							var endingHour = new Date(oral.beginningHour);
							endingHour.setHours(beginningHour.getHours()+1);
							$log.debug("beginningHour -> ");
							$log.debug(beginningHour);
							$log.debug(endingHour);
							$scope.unavailableSlots.events.push({
								id : oral.id,
								title : oral.title,
								participants : oral.participants,
								user_id : oral.user_id,
								start : beginningHour,
								end : endingHour,
								allDay : false,
								startEditable : false,
								durationEditable : false
							});	
						});
					};
					$scope.generateUnavailableSlots();
					$log.debug("unavailableSlots");
					$log.debug($scope.unavailableSlots.events);

					$scope.generateFreeSlots = function() {
						var date = new Date($scope.calendar.beginningDate);
						var endingDate = new Date($scope.calendar.endingDate);
						$i = 0;
						
						addDaySlots = function() {
							angular.forEach($scope.calendar.timeSlots, function(time_slot, key) {
								var current_hour = time_slot.beginningHour;
								while ( current_hour + $scope.calendar.duration <= time_slot.endingHour) {
									var d1 = new Date(date.setHours(current_hour, 0, 0));
									var d2 = new Date(date.setHours(current_hour + $scope.calendar.duration, 0, 0));

									$scope.free_slots.events.push({
										id : $i,
										title : "Libre",
										start : d1,
										end : d2,
										allDay : false,
										startEditable : false,
										durationEditable : false
									});
									$i++;

									current_hour += $scope.calendar.duration;
								}			
							});
						};
						do {
							addDaySlots();
							date.setDate(date.getDate() + 1);
						} while (endingDate.getDate() >= date.getDate());
					};
					$scope.generateFreeSlots();
				}
			);

			// Récupération de la liste des oral du user connecté pour le calendrier passé en paramètre
			/*
			OralService.listUserOral($stateParams.id, $stateParams.link).then(
				function(response){
					if(response.data.error !== null) {
						$log.debug(response.data);
						$state.go('calendar');
					} else {
						$log.debug(response.data);
						$scope.orals = response.data.value;
					}
				}
			);
			*/
			$scope.eventSources = [$scope.free_slots, $scope.unavailableSlots];
		};

		//init
		$scope.init();
	}
])

.controller('OralDetailCtrl', ['$scope', '$log', '$stateParams', 'OralService',
	function($scope, $log, $stateParams, OralService) {
		$log.debug('OralDetailCtrl');
	}
])

;
