package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.repository.OralRepository;
import com.angers.m2sili.soutenance.repository.UserRepository;
import com.angers.m2sili.soutenance.service.OralService;

/**
 * Classe d'implémentation du service de Oral.
 * 
 * @author Benoît Caufriez
 * 
 */

@Service
public class OralServiceImpl implements OralService {

	@Autowired
	private OralRepository oralRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	@Transactional
	public Oral create(Oral oral) {		
		return oralRepository.save(oral);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		oralRepository.delete(id);
	}
	
	@Override
	@Transactional(readOnly = true)
	public Oral get(Integer id) {
		return oralRepository.findOne(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Oral> getAll() {
		return oralRepository.findAll();
	}

	@Override
	public Oral update(Oral oral) {
		return oralRepository.save(oral);
	}

	@Override
	public List<Oral> getUserOrals(Integer user_id) {
		User user = userRepository.findOne(user_id);
		return user.getOrals();
	}
	
}