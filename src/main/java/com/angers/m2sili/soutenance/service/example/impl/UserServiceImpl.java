package com.angers.m2sili.soutenance.service.example.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.model.enumeration.Droit;
import com.angers.m2sili.soutenance.repository.UserRepository;
import com.angers.m2sili.soutenance.service.example.UserService;

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
	public User create(String login, String password, String mail, Droit flag) {
		User user = new User();
		user.setLogin(login);
		user.setPassword(password);
		user.setMail(mail);
		user.setFlag(flag);
		
		return userRepository.save(user);
	}

}
