/**
 * @author Pierre Evers
 */

angular.module('soutenanceplanner.calendar')

.controller('CalendarAddCtrl', ['$scope', '$log', '$state', '$filter', '$stateParams', 'CalendarService', 'FormationService',
	function($scope, $log, $state, $filter, $stateParams, CalendarService, FormationService) {
	
		$log.debug('CalendarAddCtrl');

		$scope.init = function(){
			FormationService.listFormation().then(
				function(response){
					$scope.formations = response.data;
					$log.debug(response.data);
				}
			);
		};
		
		$scope.init();

		/**
		 * Liste des durées disponible dans le formulaire
		 */
		$scope.durations = [ {
			value : 0.5,
			label : "30min"
		}, {
			value : 0.75,
			label : "40min"
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
			if ($scope.new_calendar.time_slot_list.length < 3) {
				$scope.new_calendar.time_slot_list.push({
					beginning : 8,
					ending : 18
				});
			}
		};

		/**
		 * Initalisation du tableau de données du calendrier
		 */
		$scope.new_calendar = {
			title : 'New calendar',
			formation : '',
			beginning_date : new Date(),
			ending_date : new Date(),
			duration : '',
			time_slot_list : [ {
				beginning : 8,
				ending : 18
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
				}
			}
		};

		/**
		 * Construction du calendrier en fonction des différents éléments du formulaire
		 */
		$scope.initializeEvents = function(beginning_date, ending_date) {
			$scope.eventSources = [];
			var events = [];
			var date = new Date(beginning_date);
			$i =  0;
			var add_event = function(events, date) {
				angular.forEach($scope.new_calendar.time_slot_list,
						function(time_slot, key) {
							var d1 = new Date(date.setHours(
									time_slot.beginning, 0, 0));
							var d2 = new Date(date.setHours(
									time_slot.ending, 0, 0));
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
			} while (ending_date.getDate() >= date.getDate());
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
		 * Initialisation de l'événement en fonction des valeurs par défaut
		 * du tableau de données
		 */
		$scope.eventSources = [ $scope.initializeEvents($scope.new_calendar.beginning_date, $scope.new_calendar.ending_date) ];

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
			calendar.fullCalendar('addEventSource', $scope.initializeEvents($scope.new_calendar.beginning_date, $scope.new_calendar.ending_date));
		};

		$scope.createCalendar = function(){
			CalendarService.createCalendar($scope.new_calendar).then(
				function(response){
					$log.debug(response.data);
					$state.go("calendar");
				},
				function(response){
					$log.debug(response);
				}
			);
		};

		/**
		 * Ajout d'une Soutenance
		 */
		$scope.addOral = function(titreSoutenance, jours, heure) {
			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			// ici j'ajoute +1 à l'heure finale mais il faudrat ajouter la
			// durée d'une session ( pré-renseigner )
			var heureF = heure + 1;
			// on pousse un nouvel évenement dans notre tableau
			$scope.eventSources[0].push({
				title : titreSoutenance,
				start : new Date(y, m, jours, heure, 0, 0),
				end : new Date(y, m, jours, heureF, 0, 0),
				className : [ titreSoutenance ],
				allDay : false
			});

		};
	}
])

.controller('CalendarEditCtrl', ['$scope', '$log', '$stateParams', 'CalendarService',
	function($scope, $log, $stateParams, CalendarService) {
		$log.debug('CalendarEditCtrl');
	}
])

.controller('CalendarListCtrl', ['$scope', '$log', '$stateParams', 'CalendarService',
	function($scope, $log, $stateParams, CalendarService) {
		$log.debug('CalendarListCtrl');
	}
])

.controller('CalendarDetailCtrl', ['$scope', '$log', '$stateParams', 'CalendarService',
	function($scope, $log, $stateParams, CalendarService) {
		$log.debug('CalendarDetailCtrl');
	}
])

;
