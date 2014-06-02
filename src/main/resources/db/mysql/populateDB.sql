INSERT IGNORE INTO user VALUES (1, 'SUPER_ADMIN', 'richer', 'richer@soutenance.fr', 'password');
INSERT IGNORE INTO user VALUES (2, 'SUPER_ADMIN', 'admin', 'admin@soutenance.fr', 'password');
INSERT IGNORE INTO user VALUES (3, 'ADMIN', 'admin1', 'admin1@soutenance.fr', 'admin1');
INSERT IGNORE INTO user VALUES (4, 'ADMIN', 'admin2', 'admin2@soutenance.fr', 'admin2');
INSERT IGNORE INTO user VALUES (5, 'USER', 'user1', 'user1@soutenance.fr', 'user1');
INSERT IGNORE INTO user VALUES (6, 'USER', 'user2', 'user2@soutenance.fr', 'user2');

INSERT IGNORE INTO formation VALUES (1, 'L3 Info');
INSERT IGNORE INTO formation VALUES (2, 'M1 Info');
INSERT IGNORE INTO formation VALUES (3, 'M2 ID');
INSERT IGNORE INTO formation VALUES (4, 'M2 SILI');

INSERT IGNORE INTO calendar VALUES (1, '2014-06-02 08:00:00', 1, '2014-06-05 18:00:00', '16dg16d5rg167dg', 'Soutenance de stage', 4, 1);

INSERT IGNORE INTO oral VALUES (1, '2014-06-02 08:00:00', 'Jean Dupont, Pierre Jacques', 'Présentation Jeannot', 1, 1);
INSERT IGNORE INTO oral VALUES (2, '2014-06-02 10:00:00', 'Jean Dupont', 'Présentation Titi', 1, 1);
INSERT IGNORE INTO oral VALUES (3, '2014-06-02 14:00:00', 'user1, user2', 'Présentation Lalala', 1, 2);
INSERT IGNORE INTO oral VALUES (4, '2014-06-03 11:00:00', 'admin1, admin2', 'Présentation Lululu', 1, 3);