package com.angers.m2sili.soutenance.service.impl;

import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.service.FactoryService;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;
import com.angers.m2sili.soutenance.web.dto.FormationDTO;
import com.angers.m2sili.soutenance.web.dto.UserDTO;

/**
 * Classe d'implémentation du service de Factory.
 * 
 * @author typhoon
 * 
 */

@Service
public class FactoryServiceImpl implements FactoryService {

	@Override
	public UserDTO user() {
		return new UserDTO();
	}

	@Override
	public FormationDTO formation() {
		return new FormationDTO();
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
