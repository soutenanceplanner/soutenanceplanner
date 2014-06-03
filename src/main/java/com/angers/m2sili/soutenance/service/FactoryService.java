package com.angers.m2sili.soutenance.service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;
import com.angers.m2sili.soutenance.web.dto.UserDTO;
import com.angers.m2sili.soutenance.model.Oral;

/**
 * Interface du service de Factory des beans.
 * 
 * @author typhoon
 *
 */

public interface FactoryService {

	public UserDTO user();

	public Formation formation();
	
	public AuthenticateDTO authenticate();

	public Oral oral();

	public Calendar calendar();

}
