package com.angers.m2sili.soutenance.service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;

/**
 * Interface du service de Factory des beans.
 * @author typhoon
 *
 */

public interface FactoryService {

	public User user();

	public Formation formation();
	
	public AuthenticateDTO authenticate();

	public Calendar calendar();

}
