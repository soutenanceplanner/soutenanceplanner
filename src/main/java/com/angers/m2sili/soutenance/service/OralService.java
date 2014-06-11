package com.angers.m2sili.soutenance.service;

import java.util.ArrayList;
import java.util.Set;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.web.dto.OralDTO;

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
	
	ArrayList<OralDTO> getOralsByCalendar(Calendar cal);
	
	Oral update(Oral oral);
	
	Set<Oral> getUserOrals(Integer user_id, Integer calendar_id);

	void deleteListOralByCalendarId(Integer id);
	Set<Oral> getList2();
	void deleteOralById(Integer id);
	OralDTO getAsDTO(Integer id);
	
}
