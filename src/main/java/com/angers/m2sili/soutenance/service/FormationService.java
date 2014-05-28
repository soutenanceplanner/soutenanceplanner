package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.Formation;

/**
 * Interface du service de User.
 * @author typhoon
 *
 */

public interface FormationService {

	public Formation create(Formation formation);
	
	public void delete(Integer id);

	Formation get(Integer id);
	
	List<Formation> getAll();
}

