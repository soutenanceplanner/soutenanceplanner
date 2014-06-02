package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.Oral;

/**
 * Interface du service de Oral.
 * 
 * @author Benoît Caufriez
 *
 */

public interface OralService {

	Oral create(Oral oral);
	
	void delete(Integer id);

	Oral get(Integer id);
	
	List<Oral> getAll();
	
	Oral update(Oral oral);

	List<Oral> getUserOral(Integer user_id);
}
