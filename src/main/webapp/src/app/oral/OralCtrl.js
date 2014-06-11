angular.module('soutenanceplanner.oral')

.config(function($modalProvider) {
		angular.extend($modalProvider.defaults, {
		html: true
	});
})

.controller('OralListCtrl', ['$scope', '$q', '$modal', '$log', '$alert', '$state', '$stateParams', 'OralService', 'FactoryService', 'CalendarService', 'FormationService', 'SecurityService',
	function($scope, $q, $modal, $log, $alert, $state, $stateParams, OralService, FactoryService, CalendarService, FormationService, SecurityService) {
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
							var sauvEvent = event; 
							$scope.event = event;
							$scope.oral = {}; 
							$scope.oral.beginningHour = event.start;
							var oralModal;

							$log.debug('BEFORE');
							$log.debug("event");
							$log.debug($scope.event);
							$log.debug("reservedSlots");
							$log.debug($scope.reservedSlots);
							$log.debug("unavailableSlots");
							$log.debug($scope.unavailableSlots);
							$log.debug("availableSlots");
							$log.debug($scope.availableSlots);
					
							if (event.status == STATUS.AVAILABLE) {
								oralModal = $modal(
									{
										scope: $scope,
										template: 'oral/add.tpl.html',
										show: false
									}
								);
							}
							else if (event.status == STATUS.UNAVAILABLE) {
								if ($scope.isAdmin) {
									oralModal = $modal(
										{
											scope: $scope,
											template: 'oral/edit.tpl.html',
											show: false
										}
									);
								}
								else{
									oralModal = $modal(
										{
											scope: $scope,
											template: 'oral/detail.tpl.html',
											show: false
										}
									);
								}
							}
							else if (event.status == STATUS.RESERVED) {
								oralModal = $modal(
									{
										scope: $scope,
										template: 'oral/edit.tpl.html',
										show: false
									}
								);
							}

							$scope.showModal = function() {
								oralModal.$promise.then(oralModal.show);
							};

							$scope.hideModal = function() {
								oralModal.$promise.then(oralModal.hide);
								if (event.status == STATUS.AVAILABLE) {
									event.title = "";
									event.participants = "";
								}
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
					$i =  0;
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
										id: $i,
										status : STATUS.AVAILABLE,
										userId : $scope.user.id,
										titre : "",
										people: "",
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

		/**
		 * Fonction qui permet de mettre à jour un oral
		 * @param  {int} id [identifiant de l'oral]
		 */
		$scope.createOral = function(){
			var createDeferred = $q.defer();
			var oral;
			/* Initialisation de l'oral */
			FactoryService.oral().then(
				function(response){
					oral = response.data;
					createDeferred.resolve();
				}
			);

			var promise = createDeferred.promise;
			promise.then(function() {
				/* On efface la modal */
				$scope.hideModal();

				/* On insère les données de l'oral */
				oral.title = $scope.event.titre;
				oral.participants = $scope.event.people;
				oral.beginningHour = $scope.event.start;
				oral.calendarId = $scope.event.calendarId;
				oral.userId = $scope.event.userId;

				OralService.createOral(oral).then(
					function(response){
						oral= response.data;

						/* On ajoute dans la vue le nouveau créneau réservé */
						var newEvent = {
							id : oral.id,
							status : STATUS.RESERVED,
							title : oral.title,
							participants : oral.participants,
							userId : $scope.user.id,
							start : $scope.event.start,
							end : $scope.event.end,
							allDay : false,
							startEditable : false,
							durationEditable : false
						};
						$scope.reservedSlots.events.push(newEvent);

						/* On suprime dans la vue l'ancien créneau libre */
						for (var index = 0; index < $scope.availableSlots.events.length; index++) {
							if ($scope.availableSlots.events[index].id == $scope.event.id) {
								$scope.availableSlots.events.splice(index,1);
							}
						}
						
						var myAlert = $alert({
							title: '', 
							content: 'La soutenace a été ajoutée',
							placement: 'top-right',
							type: 'success',
							duration : '3',
							show: true
						});
					},
					function(response){
						var myAlert = $alert({
							title: '', 
							content: 'Erreur : Impossible de créer la soutenance',
							placement: 'top-right',
							type: 'danger',
							duration : '3',
							show: true
						});
						$state.go("home");
					}
				);
			});
		};

		/**
		 * Fonction qui permet de mettre à jour un oral
		 * @param  {int} id [identifiant de l'oral]
		 */
		$scope.updateOral = function(id){
			var updateDeferred = $q.defer();
			var oral;
			/* Récupération de l'oral */
			OralService.getOral(id).then(
				function(response){
					oral = response.data;
					updateDeferred.resolve();
				}
			);

			var promise = updateDeferred.promise;
			promise.then(function() {
				/* On efface la modal */
				$scope.hideModal();

				oral.title = $scope.event.title;
				oral.participants = $scope.event.participants;

				OralService.updateOral(oral).then(
					function(response){
						oral= response.data;
						
						var myAlert = $alert({
							title: '', 
							content: 'La soutenace a été mise à jour',
							placement: 'top-right',
							type: 'success',
							duration : '3',
							show: true
						});
					},
					function(response){
						var myAlert = $alert({
							title: '', 
							content: 'Erreur : Impossible de mettre à jour la soutenance',
							placement: 'top-right',
							type: 'danger',
							duration : '3',
							show: true
						});
						$state.go("home");
					}
				);
			});
		};

		/**
		 * Fonction qui permet de suprimer un oral
		 * @param  {int} id [identifiant de l'oral]
		 */
		$scope.deleteOral = function(id){
			var deleteDeferred = $q.defer();
			/* Récupération de l'oral */
			OralService.getOral(id).then(
				function(response){
					var oral = response.data;
					deleteDeferred.resolve();
				}
			);

			var promise = deleteDeferred.promise;
			promise.then(function() {
				/* On efface la modal */
				$scope.hideModal();

				OralService.deleteOral(id).then(
					function(response){
						/* On ajoute dans la vue un nouveau créneau disponible */
						$scope.availableSlots.events.push({
							status : STATUS.AVAILABLE,
							userId : $scope.user.id,
							calendarId : $scope.calendar.id,
							start : $scope.event.start,
							end : $scope.event.end,
							allDay : false,
							startEditable : false,
							durationEditable : false
						});

						/* On suprime la vue l'ancien créneau */
						var index = 0;
						if ($scope.event.status.value == 2) {
							for (index = 0; index < $scope.reservedSlots.events.length; index++) {
								if ($scope.reservedSlots.events[index].id == $scope.event.id) {
									$scope.reservedSlots.events.splice(index,1);
								}
							}
						}
						else if ($scope.event.status.value == 1) {
							for (index = 0; index < $scope.unavailableSlots.events.length; index++) {
								if ($scope.unavailableSlots.events[index].id == $scope.event.id) {
									$scope.unavailableSlots.events.splice(index,1);
								}
							}
						}

						var myAlert = $alert({
							title: '', 
							content: 'La soutenace a été supprimée',
							placement: 'top-right',
							type: 'success',
							duration : '3',
							show: true
						});
					},
					function(response){
						var myAlert = $alert({
							title: '', 
							content: 'Erreur : Impossible de suprimer la soutenance',
							placement: 'top-right',
							type: 'danger',
							duration : '3',
							show: true
						});
						$state.go("home");
					}
				);
			});
		};

		//init
		$scope.init();

		/* Ajout des événements pour la vue */
		$scope.eventSources = [$scope.availableSlots, $scope.reservedSlots, $scope.unavailableSlots];
	}
])

;