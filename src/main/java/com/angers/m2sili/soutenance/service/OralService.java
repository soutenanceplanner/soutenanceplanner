package com.angers.m2sili.soutenance.service;

import java.util.Set;

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
	
	Set<Oral> getAll();
	
	Oral update(Oral oral);
	
	Set<Oral> getUserOrals(Integer user_id, Integer calendar_id);

	Set<Oral> getUserOrals(Integer user_id);
	
	void deleteListOralByCalendarId(Integer id);
}
