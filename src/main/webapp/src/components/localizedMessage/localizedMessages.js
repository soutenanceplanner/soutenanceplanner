angular.module('services.i18n', []).factory('i18n', [

	function() {
		return {
			dateformat: 'dd/MM/yyyy',
			timeSelector:{
				hours:"Heures",
				minutes:"Minutes"
			},
			errors: {
				mel : "Votre adresse mél est incorrecte. Veuillez vérifier votre saisie.",
				melMatch : "Les deux adresses mél saisies ne correspondent pas. Veuillez vérifier votre saisie.",
				passwordMatch : "Les deux mots de passe saisis ne correspondent pas. Veuillez vérifier votre saisie."
			},
			age: {
				year: "a",
				month: "m",
				day: "j"
			},
			nombre: {
				eme: "ème",
				ere: "ère"
			},
			app: {
				name: 'Bafabafd',
				heure: "h",
				minute: "mn",
				day: "j",
				kilo: "kg",
				ministere : "Ministère des droits des femmes, de la ville, de la jeunesse et des sports"
			},
			mois: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
			button: {
				save: "Enregistrer",
				supprimer: "Supprimer",
				next: 'Suivant',
				prev: 'Précédent',
				finish: 'Finir',
				connect: 'Connexion',
				valider: 'Valider',
				ajouter: 'Ajouter',
				telechargerPdf:'Télécharger en PDF',
				telechargerExcel:'Télécharger sous Excel',
				back: 'Retour',
				importer: "Importer",
				previousStep: "Cliquer ici pour revenir à l'étape précédente.",
				close: "Fermer",
				cancel: "Annuler",
				oui: "Oui",
				non: "Non",
				sortir: "Sortir",
				upload: "Cliquer ici pour chercher le fichier sur votre disque dur",
				more: "Afficher +",
				all: "Afficher tout"
			},
			message: {
				infoMandatory: "Champ requis",
				loading: "Chargement en cours...",
				successDone: "Opération effectuée avec succès.",
				renewSent: "Nous venons juste de vous envoyer un email. Il contient les informations pour retrouver votre mot de passe.",
				unkownUser: "L'utilisateur est introuvable, vérifiez votre saisie."
			},
			menu: {
				top: {
				},
				left: {
				},
				content: {
				}
			},
			login: {
				email : "Identifiant / Mél",
				password : "Mot de passe",
				error: {
					authFail : "Identifiant ou mot de passe incorrect. Veuillez vérifier votre saisie"
				},
				forgot: {
					password: "Mot de passe perdu",
					id : "Identifiant oublié"
				}
			},
			logout: {
				errorMsg: "Attention: vous n'êtes pas déconnecté ! Une erreur s'est produite lors de la déconnexion, veuillez réessayer."
			},
			register: {
				titre : "M'inscrire",
				typeDiplome : {
					"none" : 0,
					"bafa" : 1,
					"bafd" : 2,
					"rae" : 3,
					"qual" : 4
				},
				civilites: [
					{ 
						name: "M.", 
						value: 1
					},
					{
						name: "Mme",
						value: 2
					}
				],
				foreign: [
					{
						name: "France",
						value: false
					},
					{
						name: "Etranger",
						value: true
					}
				],
				formations: [
					"bafa",
					"bafd",
					"rae",
					"qual"
				],
				options : {
					bafd: [
							{
								name : "Titulaire BAFA",
								value: 2
							},
							{
								name : "Titulaire autre diplôme",
								value: 3
							},
							{
								name : "Demande dérogation",
								value: 4
							},
							{
								name : "Dérogation obtenue",
								value: 5
							}
					],
					rae: {
						typeDemande: [
							{
								name: "Session de perfectionnement",
								value: 1
							},
							{
								name: "Envoi de justificatif",
								value: 2
							},
							{
								name: "Demande de prorogation",
								value: 3
							}
						],
						typeJustificatif: [
							{
								name: "Emploi de direction ou adjoint en ACM",
								value: 1
							},
							{
								name: "Attestation de formateur session BAFA-BAFD",
								value: 2
							}
						]
					}
				}
			},
			infos : {
				titre : "M'informer"
			},
			news : {
				titre : "Près de chez moi"
			},
			documentation : {
				titre : "Ressources"
			},
			account : {
				typeDiplome : {
					0 : "Aucun",
					1 : "BAFA", 
					2 : "BAFD", 
					3 : "Renouvellement BAFD",
					4 : "Qualification complémentaire"
				},
				cursus: {
					prorogation: {
						button: {
							demandeProrogation : "Demander une prorogation"
						},
						demande: {
							mandatory : "Le motif de votre demande n’est pas renseigné. Veuillez compléter votre demande."
						}
					},
					inspection: {
						button: {
							demandeInspection : "Demande d’inspection de stage pratique"
						},
						stageOptions: [
							{
								name : "1er Stage",
								value : 1
							},
							{
								name : "2e Stage",
								value : 2
							}
						]
					},
					session: {
						etat: {
							1 : "En cours",
							2 : "Favorable",
							3 : "Défavorable",
							4 : "Création",
							5 : "Ajourné"
						}
					},
					stage: {
						avis: {
							1 : "Favorable",
							2 : "Défavorable",
							3 : "Ajourné"
						},
						button: {
							saisirStage : "Saisir un stage pratique"
						},
						saisieStage : {
							avis : [
								{
									name : "Favorable",
									value : 1
								},
								{
									name : "Défavorable",
									value : 2
								}
							],
							error: {
								dateOrder : "La date de fin saisie doit être après la date de début. Veuillez vérifier votre saisie"
							}
						}
					},
					derogation: {
						button: {
							demande : "Demander une dérogation"
						},
						demande: {
							mandatory : "Le motif de votre demande n’est pas renseigné. Veuillez compléter votre demande."
						}
					}
				}
			}
		};
	}
]);