package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.repository.UserRepository;
import com.angers.m2sili.soutenance.service.UserService;

/**
 * Classe d'implémentation du service de User.
 * 
 * @author typhoon
 * 
 */

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	@Transactional
	public User create(User user) {		
		return userRepository.save(user);
	}


	@Override
	public List<Calendar> getCalendars(int id) {

		//TODO remplacer les valeurs en dur		
		Calendar c = new Calendar();
			c.setTitle("Titre calendrier_1");
			c.setLink("lienCalendrier_1");
		
		Calendar c1 = new Calendar();
			c.setTitle("Titre calendrier_2");
			c.setLink("lienCalendrier_2");	
				
		User us = new User();
			us.getListeCalendrier().add(c); 
			us.getListeCalendrier().add(c1); 
			
		List<Calendar> liste = us.getListeCalendrier();
		
		return liste;
	}


}
