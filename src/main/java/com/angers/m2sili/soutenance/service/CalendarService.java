package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.Calendar;

/**
 * 
 * @author pierre
 *
 */
public interface CalendarService {
	
	public Calendar create(Calendar cal);
	public Calendar get(int idCal);
	public List<Calendar> getAll();
	public List<Calendar> getAllFuturs();
	public List<Calendar> getAllPast();
	void delete(Integer id);
	Calendar update(Calendar calendar);
	
}
