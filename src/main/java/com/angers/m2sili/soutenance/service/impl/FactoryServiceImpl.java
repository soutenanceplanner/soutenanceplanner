package com.angers.m2sili.soutenance.service.impl;

import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.FactoryService;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;

/**
 * Classe d'implémentation du service de Factory.
 * 
 * @author typhoon
 * 
 */

@Service
public class FactoryServiceImpl implements FactoryService {

	@Override
	public User user() {
		return new User();
	}
	
	@Override
	public Formation formation() {
		return new Formation();
	}
	
	public AuthenticateDTO authenticate() {
		return new AuthenticateDTO();
	}

	@Override
	public Oral oral() {
		return new Oral();
	}

	@Override
	public Calendar calendar() {
		return new Calendar();
	}

}
