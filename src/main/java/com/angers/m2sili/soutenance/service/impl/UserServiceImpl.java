package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.repository.UserRepository;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.UserDTO;

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
	@Transactional(readOnly = true)
	public UserDTO getAsDTO(Integer id) {
		User user = userRepository.findOne(id);
		
		UserDTO dto = new UserDTO();
		dto.setId(user.getId().toString());
		dto.setFlag(user.getFlag());
		dto.setLogin(user.getLogin());
		dto.setMail(user.getMail());
		dto.setPassword(user.getPassword());
		
		return dto;
	}
	
	@Override
	@Transactional(readOnly = true)
	public User get(Integer id) {
		return userRepository.findOne(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		userRepository.delete(id);
	}

	@Override
	public User update(User user) {
		return userRepository.save(user);
	}

	@Override
	public User findByLogin(String login) {
		return userRepository.findByLogin(login);
	}

	@Override
	public User getUserByMail(String mail) {
		
		userRepository.findByMail(mail);
		
		return null;
	}
	
}
