package com.angers.m2sili.soutenance.service;

import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.model.Oral;

/**
 * Interface du service de Factory des beans.
 * 
 * @author typhoon
 *
 */

public interface FactoryService {

	public User user();

	public Formation formation();

	public Oral oral();

}
