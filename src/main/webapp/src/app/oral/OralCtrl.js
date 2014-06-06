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
			CalendarService.getCalendar($stateParams.id, $stateParams.link).then(
				function(response){
					$scope.calendar = response.data.value;
					$log.debug($scope.calendar);

					/* Récupération de la liste des oral du user connecté pour le calendrier passé en paramètre */
					OralService.listUserOral($stateParams.id, $stateParams.link).then(
						function(response){
							if(response.data.error !== null) {
								$log.debug(response.data);
								deferred.resolve();
							} else {
								$scope.orals = response.data.value;
								$log.debug($scope.orals);
								deferred.resolve();
							}
						}
					);
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
							if (event.status == STATUS.AVAILABLE) {
								$scope.event = event;
								$scope.oral = {}; 
								$scope.oral.beginningHour = event.start;
								var addOralModal = $modal(
									{
										scope: $scope,
										template: 'oral/add.tpl.html', 
										show: false
									}
								);
								
								$scope.showModal = function() {
									addOralModal.$promise.then(addOralModal.show);
								};

								$scope.hideModal = function() {
									addOralModal.$promise.then(addOralModal.hide);
								};

								$scope.showModal();
							}
							else if (event.status == STATUS.UNAVAILABLE) {
								alert("Le créneau est déjà réservé pour l'événement : " + event.title);
							}
							else if (event.status == STATUS.RESERVED) {
								alert("Vous avez déjà réservé le créneau pour l'événement : " + event.title);
							}
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
							user_id : oral.user_id,
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

				/* Fonction qui permet de générer les créneaux réservés par l'utilisateur
				 */
				$scope.generateReservedSlots = function() {
					$log.debug($scope.orals);
					angular.forEach($scope.orals, function(oral, key) {
						var beginningHour = new Date(oral.beginningHour);
						var endingHour = new Date(oral.beginningHour);
						endingHour.setHours(beginningHour.getHours()+1);
						//if( oral.user_id == 1) {
							$scope.reservedSlots.events.push({
								id : oral.id,
								status : STATUS.RESERVED,
								title : oral.title,
								participants : oral.participants,
								user_id : oral.user_id,
								start : beginningHour,
								end : endingHour,
								allDay : false,
								startEditable : false,
								durationEditable : false
							});
						//}
					});
				};
				$scope.generateReservedSlots();
				$log.debug("reservedSlots");
				$log.debug($scope.reservedSlots.events);

				/* Fonction qui permet de générer les créneaux libres 
				 */
				$scope.generateAvailableSlots = function() {
					var date = new Date($scope.calendar.beginningDate);
					var endingDate = new Date($scope.calendar.endingDate);
					
					addDaySlots = function() {
						angular.forEach($scope.calendar.timeSlots, function(time_slot, key) {
							var current_hour = time_slot.beginningHour;
							while ( current_hour + $scope.calendar.duration <= time_slot.endingHour) {
								var d1 = new Date(date.setHours(current_hour, 0, 0));
								var d2 = new Date(date.setHours(current_hour + $scope.calendar.duration, 0, 0));

								$scope.availableSlots.events.push({
									status : STATUS.AVAILABLE,
									title : "Libre",
									userId : 1,
									calendarId : $scope.calendar.id,
									start : d1,
									end : d2,
									allDay : false,
									startEditable : false,
									durationEditable : false
								});

								current_hour += $scope.calendar.duration;
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
