package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.web.dto.FormationDTO;

/**
 * Interface du service de User.
 * @author typhoon
 *
 */

public interface FormationService {

	public Formation create(Formation formation);
	
	public void delete(Integer id);

	Formation get(Integer id);
	
	FormationDTO getAsDTO(Integer id);
	
	List<Formation> getAll();
	
	Formation findByName(String name);
	
	Formation update(Formation formation);

}

