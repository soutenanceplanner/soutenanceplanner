package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.User;

/**
 * 
 * @author pierre
 *
 */
public interface CalendarService {
	
	public Calendar create(Calendar cal);
	public Calendar get(int idCal);
	public List<Calendar> getAll();
	public List<Calendar> getAll(String login);
	public List<Calendar> getAllFuturs();
	public List<Calendar> getAllPast();
	public List<Calendar> getAllPresent();
	public List<Calendar> getInscriptionCalendars(User user);
	void delete(Integer id);
	Calendar update(Calendar calendar);
	public List<Calendar> findAllByFormationName(String formation);
	
}
