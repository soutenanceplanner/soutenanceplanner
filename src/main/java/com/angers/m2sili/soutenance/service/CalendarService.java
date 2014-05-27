package com.angers.m2sili.soutenance.service;

import java.util.ArrayList;

import com.angers.m2sili.soutenance.model.Calendar;

public interface CalendarService {
	
	public Calendar createCalendar(Calendar cal);
	public Calendar getCalendar(int idCal);
	public ArrayList<Calendar> getListCalendars(String id);
	
	public ArrayList<Calendar> getListFuturesCalendars();

	
	
}
