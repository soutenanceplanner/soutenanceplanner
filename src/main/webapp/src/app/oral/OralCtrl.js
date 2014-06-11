angular.module('soutenanceplanner.oral')

.config(function($modalProvider) {
		angular.extend($modalProvider.defaults, {
		html: true
	});
})

.controller('OralAddCtrl', ['$scope', '$log', '$alert', '$state', 'OralService', 'FactoryService', 'SecurityService',
	function($scope, $log, $alert, $state, OralService, FactoryService, SecurityService) {
		$log.debug('OralAddCtrl');

		/* Statut des événements */
		var STATUS = {
			AVAILABLE  : {value: 0, name: "Available",   code: "A"}, 
			UNAVAILABLE: {value: 1, name: "Unavailable", code: "U"}, 
			RESERVED   : {value: 2, name: "Reserved",    code: "R"}
		};

		$scope.init = function(){

			FactoryService.oral().then(
				function(response){
					$scope.oral = response.data;
				}
			);
		};

		//init
		$scope.init();

		$scope.createOral = function(){
			$scope.oral.title = $scope.event.title;
			$scope.oral.participants = $scope.event.participants;
			$scope.oral.beginningHour = $scope.event.start;
			$scope.oral.calendarId = $scope.event.calendarId;
			$scope.oral.userId = $scope.event.userId;

			/* MaJ de la vue */
			location.reload(true); // <- A revoir
			/*
			$scope.event.status = STATUS.RESERVED;
			$scope.reservedSlots.events.push($scope.event);
			$scope.remove = function(index) {
				$scope.events.splice(index,1);
			};
			*/
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
	}
])

.controller('OralEditCtrl', ['$scope', '$location', '$log', '$state', '$stateParams', '$alert', 'OralService',
	function($scope, $location, $log, $state, $stateParams, $alert, OralService) {
		$log.debug('OralEditCtrl');

		$scope.init = function(){
			OralService.getOral($scope.event.id).then(
				function(response){
					$scope.oral = response.data;
				}
			);
		};

		//init
		$scope.init();
		
		$scope.updateOral = function () {
			$scope.oral.title = $scope.event.title;
			$scope.oral.participants = $scope.event.participants;

			$scope.hideModal();

			OralService.updateOral($scope.oral).then(
				function(response){
					$scope.oral= response.data;

					var myAlert = $alert({
						title: '', 
						content: 'Soutenace mise à jour',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});
				}
			);
		};

		$scope.deleteOral = function(id){
			/* MaJ de la vue */
			location.reload(true); // <- A revoir
			/*
			$scope.remove = function(index) {
				$scope.events.splice(index,1);
			};
			*/
			
			$scope.hideModal();

			OralService.deleteOral(id).then(
				function(response){
					var myAlert = $alert({
						title: '', 
						content: 'Soutenance supprimée',
						placement: 'top-right',
						type: 'success',
						duration : '3',
						show: true
					});
				}
			);
		};
	}
])

.controller('OralListCtrl', ['$scope', '$q', '$modal', '$log', '$state', '$stateParams', 'OralService', 'FactoryService', 'CalendarService', 'FormationService', 'SecurityService',
	function($scope, $q, $modal, $log, $state, $stateParams, OralService, FactoryService, CalendarService, FormationService, SecurityService) {
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

					FormationService.getFormation($scope.calendar.formationId).then(
						function(response){
							$scope.formation = response.data;
						}
					);
					deferred.resolve();
				}
			);

			var promise = deferred.promise;
			promise.then(function() {
				/* Génération du calendrier */

				/* Configuration du calendrier */
				$scope.uiConfig = {
					calendar : {
						height : 650,
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
						eventClick : function(event, jsEvent, view) {
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
								if ($scope.isAdmin) {
									addOralModal = $modal(
										{
											scope: $scope,
											template: 'oral/edit.tpl.html',
											show: false
										}
									);
								}
								else{
									addOralModal = $modal(
										{
											scope: $scope,
											template: 'oral/detail.tpl.html',
											show: false
										}
									);
								}
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

				/**
				 *  Fonction qui permet de générer les créneaux réservés
				 */
				generateReservedSlots = function() {
					var duration = $scope.calendar.duration * 60;
					angular.forEach($scope.orals, function(oral, key) {
						var beginningHour = new Date(oral.beginningHour);
						var endingHour = new Date(oral.beginningHour);
						endingHour.setMinutes(beginningHour.getMinutes() + duration );
						
						if( $scope.user && $scope.user.id == oral.userId) {
							/* Ajout des créneaux réservés par l'utilisateur */
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
							/* Ajout des créneaux réservés par les autres utilisateurs */
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

				/**
				 *  Fonction qui permet de générer les créneaux libres 
				 */
				generateAvailableSlots = function() {
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

								if( $scope.user && (!eventExist(d1, $scope.reservedSlots.events)) && (!eventExist(d1, $scope.unavailableSlots.events)) )  {
									$scope.availableSlots.events.push({
										status : STATUS.AVAILABLE,
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

				generateReservedSlots();
				generateAvailableSlots();

			});
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
