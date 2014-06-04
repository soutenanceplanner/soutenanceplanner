/**
 * @author Pierre Evers
 */

angular.module('soutenanceplanner.calendar')

.controller('CalendarAddCtrl', ['$scope', '$log', '$state', '$filter', '$stateParams', 'CalendarService', 'FormationService', 'SecurityService',
	function($scope, $log, $state, $filter, $stateParams, CalendarService, FormationService, SecurityService) {
	
		$log.debug('CalendarAddCtrl');

		$scope.init = function(){
			FormationService.listFormation().then(
				function(response){
					$scope.formations = response.data;
				}
			);
			SecurityService.retrieveUser().then(
				function(response) {
					$scope.user = response.data;
				}
			);
		};
		
		$scope.init();

		/**
		 * Liste des durées disponible dans le formulaire
		 */
		$scope.durations = [ {
			value : 0.25,
			label : "15min"
		}, {
			value : 0.5,
			label : "30min"
		}, {
			value : 0.75,
			label : "45min"
		}, {
			value : 1,
			label : "1h"
		} ];

		/**
		 * Liste des heures disponible dans le formulaire
		 */
		$scope.hours = [ {
			value : 7,
			label : "7h"
		}, {
			value : 8,
			label : "8h"
		}, {
			value : 9,
			label : "9h"
		}, {
			value : 10,
			label : "10h"
		}, {
			value : 11,
			label : "11h"
		}, {
			value : 12,
			label : "12h"
		}, {
			value : 13,
			label : "13h"
		}, {
			value : 14,
			label : "14h"
		}, {
			value : 15,
			label : "15h"
		}, {
			value : 16,
			label : "16h"
		}, {
			value : 17,
			label : "17h"
		}, {
			value : 18,
			label : "18h"
		}, {
			value : 19,
			label : "19h"
		}, {
			value : 20,
			label : "20h"
		} ];

		/**
		 * Ajout d'une plage horaire à la volée
		 */
		$scope.add_time_slot = function() {
			if ($scope.new_calendar.timeSlots.length < 3) {
				$scope.new_calendar.timeSlots.push({
					beginningHour : 8,
					endingHour : 18
				});
			}
		};

		/**
		 * Initalisation du tableau de données du calendrier
		 */
		$scope.new_calendar = {
			title : 'New calendar',
			formation : '',
			beginningDate : new Date(),
			endingDate : new Date(),
			duration : '',
			timeSlots : [ {
				beginningHour : 8,
				endingHour : 18
			} ],
			constraints : [],
			link : '',
			is_valid : false
		};

		/**
		 * Configuration de l'élément calendar
		 */
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
				}
			}
		};

		/**
		 * Construction du calendrier en fonction des différents éléments du formulaire
		 */
		$scope.initializeEvents = function(beginningDate, endingDate) {
			$scope.eventSources = [];
			var events = [];
			var date = new Date(beginningDate);
			$i =  0;
			var add_event = function(events, date) {
				angular.forEach($scope.new_calendar.timeSlots,
						function(timeSlot, key) {
							var d1 = new Date(date.setHours(timeSlot.beginningHour, 0, 0));
							var d2 = new Date(date.setHours(timeSlot.endingHour, 0, 0));
							events.push({
								id : $i,
								title : $scope.new_calendar.title,
								start : d1,
								end : d2,
								allDay : false,
								startEditable : false,
								durationEditable : false
							});
							$i++;
						});
			}; 
			do {
				add_event(events, date);
				date.setDate(date.getDate() + 1);
			} while (endingDate.getDate() >= date.getDate());
			return events;
		};
		
		/**
		 * Récupération/modification des contraintes au niveau de l'évènement 'resizable' du Calendar
		 */
		$scope.initializeConstraints = function(event) {
			var exists = false;
			angular.forEach($scope.new_calendar.constraints, function(constraint, key) {
				if(constraint.id == event.id) {
					$scope.new_calendar.constraints[key] = event;
					exists = true;
				}
			});
			if(!exists) {
				$scope.new_calendar.constraints.push(event);
			}
		};
		
		/**
		 * Génération du code d'accès au calendrier une fois les données validées
		 */
		$scope.generateLink = function() {
			$scope.new_calendar.is_valid = true;
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
			var string_length = 20;
			var randomstring = '';
			for (var i=0; i<string_length; i++) {
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum,rnum+1);
			}
			$scope.new_calendar.link = randomstring;
		};
		
		/**
		 * Initialisation de l'événement en fonction des valeurs par défaut
		 * du tableau de données
		 */
		$scope.eventSources = [ $scope.initializeEvents($scope.new_calendar.beginningDate, $scope.new_calendar.endingDate) ];

		/**
		 * Affichahe du calendrier
		 */
		$scope.renderCalendar = function(calendar) {
			calendar.fullCalendar('render');
		};

		/**
		 * Mise à jour du calendrier en fonction du formulaire
		 */
		$scope.refetchCalendar = function(calendar) {
			$scope.new_calendar.constraints = [];
			calendar.fullCalendar('removeEvents');
			calendar.fullCalendar('addEventSource', $scope.initializeEvents($scope.new_calendar.beginningDate, $scope.new_calendar.endingDate));
		};

		$scope.createCalendar = function(){
			//$scope.mesCalendriers.push($scope.new_calendar);
			$scope.generateLink();
			CalendarService.createCalendar($scope.new_calendar, $scope.user).then(
				function(response){
					$state.go("calendar");
				},
				function(response){
					$log.debug(response);
				}
			);
		};
	}
])

.controller('CalendarEditCtrl', ['$scope', '$log', '$stateParams', 'CalendarService',
	function($scope, $log, $stateParams, CalendarService) {
		$log.debug('CalendarEditCtrl');
	}
])

.controller('CalendarListCtrl', ['$scope', '$log', '$state', '$stateParams', 'CalendarService', 
	function($scope, $log, $state, $stateParams, CalendarService) {
		$log.debug('CalendarListCtrl');

		$scope.init = function(){
			CalendarService.listCalendar().then(
				function(response){
					$scope.calendars = response.data;
				}
			);
		};

		$scope.init();

		$scope.deleteCalendar = function(id){
			CalendarService.deleteCalendar(id).then(
				function(response){
					$log.debug(response.data);
					$scope.init();
				}
			);
		};
	}
])

.controller('CalendarDetailCtrl', ['$scope', '$log', '$stateParams', '$state', 'CalendarService', 'FormationService' ,
	function($scope, $log, $stateParams, $state, CalendarService, FormationService) {
		$log.debug('CalendarDetailCtrl');

		/**
		 * Configuration de l'élément calendar
		 */
		$scope.uiConfig = {
			calendar : {
				height : 450,
				editable : true,
				header : {
					left : 'prev,next today',
					center : 'title',
					right : 'month,agendaWeek'
				},
				weekends : false,
				allDaySlot : false,
				minTime : 7,
				maxTime : 20,
				eventResize : function(event, dayDelta, minuteDelta, revertFunc) {
					//$scope.initializeConstraints(event);
				},
				eventClick : function(event, jsEvent, view) {
				}
			}
		};		
		/**
		 * Affichahe du calendrier
		 */
		$scope.renderCalendar = function() {
			$(".calendar").fullCalendar('render');
		};
		
		/**
		 * Construction du calendrier en fonction des différents éléments du formulaire
		 */
		$scope.initializeEvents = function(calendar) {
			$scope.eventSources = [];
			var events = [];
			var date = new Date(calendar.beginningDate);
			$i =  0;
			var add_event = function(events, date) {
				angular.forEach(calendar.timeSlots,
						function(timeSlot, key) {
							var d1 = new Date(date.setHours(timeSlot.beginningHour, 0, 0));
							var d2 = new Date(date.setHours(timeSlot.endingHour, 0, 0));
							events.push({
								id : $i,
								title : calendar.title,
								start : d1,
								end : d2,
								allDay : false,
								startEditable : false,
								durationEditable : false
							});
							$i++;
						});
			}; 
			do {
				add_event(events, date);
				date.setDate(date.getDate() + 1);
			} while (new Date(calendar.endingDate).getDate() >= date.getDate());
			return events;
		};
		
		$scope.init = function(){
			CalendarService.getCalendar($stateParams.id, $stateParams.link).then(
				function(response){
					if(response.data.error !== null) {
						$log.debug(response.data);
						$state.go('calendar');
					} else {
						$log.debug(response.data);
						$scope.calendar = response.data.value;
						FormationService.getFormation($scope.calendar.formationId).then(
							function(response){
								$scope.formation = response.data;
							}
						);
						$(".calendar").fullCalendar('removeEventSource');
						$(".calendar").fullCalendar('addEventSource', $scope.initializeEvents($scope.calendar));
						//$(".calendar").fullCalendar( { eventSources : [ { events : $scope.initializeEvents($scope.calendar) } ] });
					}
				}
			);
		};
		$scope.init();
	}
])

.controller('OralListCtrl', ['$scope', '$log', '$stateParams',
	function($scope, $log, $stateParams) {
		$log.debug('OralDetailCtrl');

	}
])

;
