/**
 * @author Pierre Evers
 */

var Calendar = angular.module('soutenanceplanner.calendar');

Calendar.controller('CalendarCtrl', [
		'$scope',
		'$log',
		'$filter',
		function($scope, $log, $filter) {

			$log.debug('CalendarCtrl');
			
			/**
			 * Liste des durées disponible dans le formulaire
			 */
			$scope.durations = [ {
				value : 0.5,
				text : "30min"
			}, {
				value : 0.75,
				text : "40min"
			}, {
				value : 1,
				text : "1h"
			} ];

			/**
			 * Liste des heures disponible dans le formulaire
			 */
			$scope.hours = [ {
				value : 7,
				text : "7h"
			}, {
				value : 8,
				text : "8h"
			}, {
				value : 9,
				text : "9h"
			}, {
				value : 10,
				text : "10h"
			}, {
				value : 11,
				text : "11h"
			}, {
				value : 12,
				text : "12h"
			}, {
				value : 13,
				text : "13h"
			}, {
				value : 14,
				text : "14h"
			}, {
				value : 15,
				text : "15h"
			}, {
				value : 16,
				text : "16h"
			}, {
				value : 17,
				text : "17h"
			}, {
				value : 18,
				text : "18h"
			}, {
				value : 19,
				text : "19h"
			}, {
				value : 20,
				text : "20h"
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
				url_code :  '',
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
					allDaySlot : true,
					eventResize : function(event, dayDelta, minuteDelta,
							revertFunc) {
						$scope.new_calendar.beginning_date = new Date(event.start);
						if (event.end != null) {
							$scope.new_calendar.ending_date = new Date(event.end);
						} else {
							$scope.new_calendar.ending_date = new Date(event.start);
						}
					},
					eventDrop : function(event, dayDelta, minuteDelta, allDay,
							revertFunc) {
						$scope.new_calendar.beginning_date = new Date(event.start);
						if (event.end != null) {
							$scope.new_calendar.ending_date = new Date(event.end);
						} else {
							$scope.new_calendar.ending_date = new Date(event.start);
						}
					}
				}
			};
			
			/**
			 * Initialisation de l'événement en fonction des valeurs par défaut du tableau de données
			 */
			//$scope.new_calendar.beginning_date.setHours($scope.new_calendar.time_slot_list[0].beginning);
			//$scope.new_calendar.ending_date.setHours($scope.new_calendar.time_slot_list[0].ending);
			$scope.eventSources = [ [ {
				title : $scope.new_calendar.title,
				start : new Date($scope.new_calendar.beginning_date),
				end : new Date($scope.new_calendar.ending_date),
				editable : true
			} ] ];
			
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
				//$scope.new_calendar.beginning_date.setHours($scope.new_calendar.time_slot_list[0].beginning);
				//$scope.new_calendar.ending_date.setHours($scope.new_calendar.time_slot_list[0].ending);
				$scope.eventSources[0][0].title = $scope.new_calendar.title;
				$scope.eventSources[0][0].start = $scope.new_calendar.beginning_date;
				$scope.eventSources[0][0].end = $scope.new_calendar.ending_date;
				$scope.eventSources[0][0].allDay = true;
			};
			
			$scope.initializeEvents = function(beginning_date, ending_date) {
				
			};
			
			/**
			 * On ajoute une Soutenance 
			 */
			$scope.addOral = function(titreSoutenance,jours,heure){
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();	

				//ici j'ajoute +1 à l'heure finale mais il faudrat ajouter la durée d'une session ( pré-renseigner )
				var heureF = heure+1 ;

				//on pousse un nouvel évenement dans notre tableau 
				$scope.eventSources[0].push({
					title: titreSoutenance,
					start: new Date(y,m,jours,heure,0,0),
					end: new Date(y,m,jours,heureF,0,0),
					className: [titreSoutenance],
					allDay:false
				});				
				
				
			};
			

		}

]);
