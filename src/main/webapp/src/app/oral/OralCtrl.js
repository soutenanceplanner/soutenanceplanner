angular.module('soutenanceplanner.oral')

.config(function($modalProvider) {
		angular.extend($modalProvider.defaults, {
		html: true
	});
})

.controller('OralAddCtrl', ['$scope', '$log', '$alert', '$state', 'OralService', 'FactoryService', 'SecurityService',
	function($scope, $log, $alert, $state, OralService, FactoryService, SecurityService) {
		$log.debug('OralAddCtrl');

		$scope.init1 = function(){

			FactoryService.oral().then(
				function(response){
					$scope.oral = response.data;
				}
			);
		};

		$scope.createOral = function(){
			$scope.oral.beginningHour = $scope.event.start;
			$scope.oral.calendarId = $scope.event.calendarId;
			$scope.oral.userId = $scope.event.userId;
			//$log.debug($scope.oral);
			$scope.hideModal();

			OralService.createOral($scope.oral).then(
				function(response){
					var myAlert = $alert({
						title: '', 
						content: 'Soutance ajoutée',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});
					$state.go("calendar.detail.oral");
				},
				function(response){
					var myAlert = $alert({
						title: '', 
						content: 'Erreur serveur',
						placement: 'top-right',
						type: 'danger',
						duration : '3',
						show: true
					});
					$state.go("home");
				}
			);
		};

		//init
		$scope.init1();
	}
])

.controller('OralEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', 'OralService',
	function($scope, $location, $log, $state, $stateParams, OralService) {
		$log.debug('OralEditCtrl');

	}
])

.controller('OralListCtrl', ['$scope', '$q', '$modal', '$log', '$state', '$stateParams', 'OralService', 'FactoryService', 'CalendarService', 'SecurityService',
	function($scope, $q, $modal, $log, $state, $stateParams, OralService, FactoryService, CalendarService, SecurityService) {
		$log.debug('OralListCtrl');
		
		/* Statut des événements */
		var STATUS = {
			AVAILABLE  : {value: 0, name: "Available",   code: "A"}, 
			UNAVAILABLE: {value: 1, name: "Unavailable", code: "U"}, 
			RESERVED   : {value: 2, name: "Reserved",    code: "R"}
		};

		$scope.init = function(){

			/* Initialisation des variables */
			$scope.eventSources = [];
			$scope.uiConfig = {};
			$scope.availableSlots = {
				color: 'green',
				textColor: 'white',
				events: []
			};

			$scope.unavailableSlots = {
				color: 'red',
				textColor: 'white',
				events: []
			};

			$scope.reservedSlots = {
				color: 'blue',
				textColor: 'white',
				events: []
			};

			var deferred = $q.defer();
			/* Récupération du calendrier */
			CalendarService.getCalendarSoutenance($stateParams.id, $stateParams.link).then(
				function(response){
					$scope.calendar = response.data.value[0];
					$scope.user = response.data.value[1];
					$scope.orals = $scope.calendar.orals;
					deferred.resolve();
				}
			);

			var promise = deferred.promise;
			promise.then(function() {
				/* Génération du calendrier */

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
							//if (event.status == STATUS.AVAILABLE) {
							$scope.event = event;
							$scope.oral = {}; 
							$scope.oral.beginningHour = event.start;
							var addOralModal;
							
							if (event.status == STATUS.AVAILABLE) {
								addOralModal = $modal(
									{
										scope: $scope,
										template: 'oral/add.tpl.html', 
										show: false
									}
								);
							}
							else if (event.status == STATUS.UNAVAILABLE) {
								addOralModal = $modal(
									{
										scope: $scope,
										template: 'oral/edit.tpl.html', 
										show: false
									}
								);
							}
							else if (event.status == STATUS.RESERVED) {
								addOralModal = $modal(
									{
										scope: $scope,
										template: 'oral/edit.tpl.html', 
										show: false
									}
								);
							}

							$scope.showModal = function() {
								addOralModal.$promise.then(addOralModal.show);
							};

							$scope.hideModal = function() {
								addOralModal.$promise.then(addOralModal.hide);
							};

							$scope.showModal();
						}
					}
				};

				$log.debug("orals");
				$log.debug($scope.orals);
				
				/* Fonction qui permet de générer les créneaux non disponibles (créneaux déjà réservés
					par d'autres utilisateurs) 
				 */
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
							status : STATUS.UNAVAILABLE,
							title : oral.title,
							participants : oral.participants,
							userId : oral.user_id,
							start : beginningHour,
							end : endingHour,
							allDay : false,
							startEditable : false,
							durationEditable : false
						});	
					});
				};
				//$scope.generateUnavailableSlots();
				$log.debug("unavailableSlots");
				$log.debug($scope.unavailableSlots.events);

				/* Fonction qui permet de générer les créneaux réservés
				 */
				$scope.generateReservedSlots = function() {
					$log.debug($scope.orals);
					var duration = $scope.calendar.duration * 60;
					angular.forEach($scope.orals, function(oral, key) {
						var beginningHour = new Date(oral.beginningHour);
						var endingHour = new Date(oral.beginningHour);
						endingHour.setMinutes(beginningHour.getMinutes() + duration );
						//endingHour.setHours(beginningHour.getHours()+1);
						
						if( $scope.user.id == oral.userId) {
							$scope.reservedSlots.events.push({
								id : oral.id,
								status : STATUS.RESERVED,
								title : oral.title,
								participants : oral.participants,
								userId : oral.userId,
								start : beginningHour,
								end : endingHour,
								allDay : false,
								startEditable : false,
								durationEditable : false
							});
						}
						else {
							$scope.unavailableSlots.events.push({
								id : oral.id,
								status : STATUS.UNAVAILABLE,
								title : oral.title,
								participants : oral.participants,
								userId : oral.userId,
								start : beginningHour,
								end : endingHour,
								allDay : false,
								startEditable : false,
								durationEditable : false
							});
						}
					});
				};
				$scope.generateReservedSlots();
				$log.debug("reservedSlots");
				$log.debug($scope.reservedSlots.events);

				isEqual = function(date1, date2) {
					return date1.valueOf() == date2.valueOf();
				};

				eventExist = function(date, events) {
					var bool = false;
					angular.forEach(events, function(event, key) {
						if (isEqual(date, event.start)) {
							bool = true;
							return true;
						}
					});
					return bool;
				};

				/* 
				 * Fonction qui permet de générer les créneaux libres 
				 */
				$scope.generateAvailableSlots = function() {
					var date = new Date($scope.calendar.beginningDate);
					var endingDate = new Date($scope.calendar.endingDate);
					
					addDaySlots = function() {
						angular.forEach($scope.calendar.timeSlots, function(time_slot, key) {
							// On fixe la durée en minute
							var duration = $scope.calendar.duration * 60;
							var current_hour = new Date(date.setHours(time_slot.beginningHour, 0, 0));
							var ending_hour = new Date(date.setHours(time_slot.endingHour, 0, 0));
							var tmp = new Date(current_hour);

							while ( tmp <= ending_hour) {
								// d1 date de début de l'événement
								var d1 = new Date(current_hour);
								// d2 date de fin de l'événement (d1 + durée)
								var d2 = new Date(d1);
								d2.setMinutes ( d1.getMinutes() + duration );

								if ( (!eventExist(d1, $scope.reservedSlots.events)) && (!eventExist(d1, $scope.unavailableSlots.events)) )  {
									$scope.availableSlots.events.push({
										status : STATUS.AVAILABLE,
										title : "Libre",
										userId : $scope.user.id,
										calendarId : $scope.calendar.id,
										start : d1,
										end : d2,
										allDay : false,
										startEditable : false,
										durationEditable : false
									});
								}

								current_hour = new Date(d2);
								tmp = new Date(d2);
								tmp.setMinutes ( d2.getMinutes() + duration );
							}			
						});
					};
					do {
						addDaySlots();
						date.setDate(date.getDate() + 1);
					} while (endingDate.getDate() >= date.getDate());
				};
				$scope.generateAvailableSlots();
				$log.debug("availableSlots");
				$log.debug($scope.availableSlots.events);

			});
		};

		$scope.deleteOral = function(id){
			OralService.deleteOral(id).then(
				function(response){
					$log.debug(response.data);
					//$scope.init();
				}
			);
		};

		//init
		$scope.init();

		/* Ajout des événements pour la vue */
		$scope.eventSources = [$scope.availableSlots, $scope.reservedSlots, $scope.unavailableSlots];
	}
])

.controller('OralDetailCtrl', ['$scope', '$log', '$stateParams', 'OralService',
	function($scope, $log, $stateParams, OralService) {
		$log.debug('OralDetailCtrl');
	}
])

;
