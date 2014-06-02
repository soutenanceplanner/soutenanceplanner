INSERT IGNORE INTO user VALUES (1,	'ADMIN',	'admin1',	'admin1@soutenance.fr',	'password');
INSERT IGNORE INTO user VALUES (2,	'ADMIN',	'admin2',	'admin2@soutenance.fr',	'password');
INSERT IGNORE INTO user VALUES (3,	'USER',		'user1',	'user1@soutenance.fr',	'user1');
INSERT IGNORE INTO user VALUES (4,	'USER',		'user2',	'user2@soutenance.fr',	'user2');
INSERT IGNORE INTO user VALUES (3,	'USER',		'user3',	'user1@soutenance.fr',	'user3');
INSERT IGNORE INTO user VALUES (4,	'USER',		'user4',	'user2@soutenance.fr',	'user4');

INSERT IGNORE INTO formation VALUES (1,	'L3 Info');
INSERT IGNORE INTO formation VALUES (2,	'M1 Info');
INSERT IGNORE INTO formation VALUES (3,	'M2 ID');
INSERT IGNORE INTO formation VALUES (4,	'M2 SILI');


-- INSERT IGNORE INTO  calendar VALUES (1,  '2014-06-02 14:26:24', '1',  '2014-06-06 17:00:00',  '20140602',  'Soutenance L3 Info',  1, 1);
-- INSERT IGNORE INTO  calendar VALUES (2,  '2014-06-02 14:26:24', '1',  '2014-06-06 17:00:00',  '20140603',  'Soutenance M1 Info',  1, 1);
-- INSERT IGNORE INTO  calendar VALUES (3,  '2014-06-02 14:26:24', '1',  '2014-06-06 17:00:00',  '20140604',  'Soutenance M2 Info',  1, 1);
-- INSERT IGNORE INTO  calendar VALUES (4,  '2014-06-02 08:00:00', '1',  '2014-06-05 18:00:00',  '20140605',  'Soutenance de stage', 4, 1);

-- INSERT IGNORE INTO  calendar VALUES (1,	'2014-06-02 08:00:00',	1.0,	'2014-06-06 18:00:00',	'20140602',		'Soutenance de stage',	1,	1);
-- INSERT IGNORE INTO  calendar VALUES (2,	'2014-06-02 08:00:00',	1.0,	'2014-06-06 18:00:00',	'20140603',		'Soutenance de stage',	2,	1);
-- INSERT IGNORE INTO  calendar VALUES (3,	'2014-06-02 08:00:00',	1.0,	'2014-06-06 18:00:00',	'20140604',		'Soutenance de stage',	3,	1);
-- INSERT IGNORE INTO  calendar VALUES (4,	'2014-06-02 08:00:00',	1.0,	'2014-06-06 18:00:00',	'20140605',		'Soutenance de stage',	4,	1);



-- INSERT IGNORE INTO oral VALUES (1, '2014-06-02 08:00:00', 'Jean Dupont, Pierre Jacques', 'Présentation Jeannot', 1, 1);
-- INSERT IGNORE INTO oral VALUES (2, '2014-06-02 10:00:00', 'Jean Dupont',                 'Présentation Titi',    1, 1);
-- INSERT IGNORE INTO oral VALUES (3, '2014-06-02 14:00:00', 'user1, user2',                'Présentation Lalala',  1, 2);
-- INSERT IGNORE INTO oral VALUES (4, '2014-06-03 11:00:00', 'admin1, admin2',              'Présentation Lululu',  1, 3);

-- INSERT IGNORE INTO oral VALUES (1,	'2014-06-02 08:00:00',	'prof1, prof2, tuteur',		'Présentation Etudiant1',	1,	1);
-- INSERT IGNORE INTO oral VALUES (2,	'2014-06-02 10:00:00',	'prof2, tuteur',			'Présentation Etudiant2',	1,	1);
-- INSERT IGNORE INTO oral VALUES (3,	'2014-06-02 11:00:00',	'prof2, tuteur',			'Présentation Etudiant3',	1,	2);
-- INSERT IGNORE INTO oral VALUES (4,	'2014-06-02 17:00:00',	'prof2, tuteur',			'Présentation Etudiant4',	1,	3);
-- INSERT IGNORE INTO oral VALUES (5,	'2014-06-02 10:00:00',	'prof2, tuteur',			'Présentation Etudiant5',	2,	1);
-- INSERT IGNORE INTO oral VALUES (6,	'2014-06-02 14:00:00',	'prof2, prof3, tuteur',		'Présentation Etudiant6',	2,	2);
-- INSERT IGNORE INTO oral VALUES (7,	'2014-06-03 11:00:00',	'prof1, prof4, tuteur',		'Présentation Etudiant7',	2,	3);
