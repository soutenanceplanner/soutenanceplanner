INSERT IGNORE INTO user VALUES (1,	'ADMIN',	'admin1',	'admin1@soutenance.fr',	'password');
INSERT IGNORE INTO user VALUES (2,	'ADMIN',	'admin2',	'admin2@soutenance.fr',	'password');
INSERT IGNORE INTO user VALUES (3,	'USER',		'user1',	'user1@soutenance.fr',	'user1');
INSERT IGNORE INTO user VALUES (4,	'USER',		'user2',	'user2@soutenance.fr',	'user2');
INSERT IGNORE INTO user VALUES (5,	'USER',		'user3',	'user1@soutenance.fr',	'user3');
INSERT IGNORE INTO user VALUES (6,	'USER',		'user4',	'user2@soutenance.fr',	'user4');

INSERT IGNORE INTO formation VALUES (1,	'L3 Info');
INSERT IGNORE INTO formation VALUES (2,	'M1 Info');
INSERT IGNORE INTO formation VALUES (3,	'M2 ID');
INSERT IGNORE INTO formation VALUES (4,	'M2 SILI');

INSERT IGNORE INTO  calendar VALUES (1,	'2014-06-10 00:00:00',	1.0,	'2014-06-13 00:00:00',	'84dfsc2xcv5jkv556',		'Soutenance de stage',	1,	1);
INSERT IGNORE INTO  calendar VALUES (2,	'2014-06-11 08:00:00',	0.75,	'2014-06-13 00:00:00',	'a521sdf5541vvcbr8',		'Soutenance de stage',	2,	2);
INSERT IGNORE INTO  calendar VALUES (3,	'2014-06-16 08:00:00',	0.5,	'2014-06-19 00:00:00',	'5sd145561sdf165dd',		'Soutenance de stage',	3,	3);
INSERT IGNORE INTO  calendar VALUES (4,	'2014-06-02 08:00:00',	0.25,	'2014-06-02 00:00:00',	'sdfsd5102sdfdsf51',		'Soutenance de stage',	4,	4);

INSERT IGNORE INTO time_slot VALUES (1, 8,  12, 1);
INSERT IGNORE INTO time_slot VALUES (2, 14, 18, 1);
INSERT IGNORE INTO time_slot VALUES (3, 8,  18, 2);
INSERT IGNORE INTO time_slot VALUES (4, 8,  10, 3);
INSERT IGNORE INTO time_slot VALUES (5, 11, 12, 3);
INSERT IGNORE INTO time_slot VALUES (6, 14, 18, 3);
INSERT IGNORE INTO time_slot VALUES (7, 8,  12, 4);
INSERT IGNORE INTO time_slot VALUES (8, 14, 18, 4);

INSERT IGNORE INTO oral VALUES (1,	'2014-06-10 08:00:00',	'prof1, prof2, tuteur',		'Présentation Etudiant1',	1,	1);
INSERT IGNORE INTO oral VALUES (2,	'2014-06-11 10:00:00',	'prof2, tuteur',			'Présentation Etudiant2',	1,	1);
INSERT IGNORE INTO oral VALUES (3,	'2014-06-11 11:00:00',	'prof2, tuteur',			'Présentation Etudiant3',	1,	2);
INSERT IGNORE INTO oral VALUES (4,	'2014-06-11 17:00:00',	'prof2, tuteur',			'Présentation Etudiant4',	1,	3);
INSERT IGNORE INTO oral VALUES (5,	'2014-06-11 11:00:00',	'prof2, tuteur',			'Présentation Etudiant5',	2,	1);
INSERT IGNORE INTO oral VALUES (6,	'2014-06-11 14:00:00',	'prof2, prof3, tuteur',		'Présentation Etudiant6',	2,	2);
INSERT IGNORE INTO oral VALUES (7,	'2014-06-12 11:00:00',	'prof1, prof4, tuteur',		'Présentation Etudiant7',	2,	3);
