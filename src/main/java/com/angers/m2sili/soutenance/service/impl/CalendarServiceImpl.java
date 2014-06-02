package com.angers.m2sili.soutenance.service.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.service.CalendarService;


@Service
public class CalendarServiceImpl implements CalendarService{


	@Override
	public Calendar createCalendar(Calendar cal) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Calendar getCalendar(int idCal) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public ArrayList<Calendar> getListCalendars(String id) {

		//TODO remplacer les valeurs en dur		
		Calendar c = new Calendar();
			c.setTitle("Titre calendrier_1");
			c.setLink("lienCalendrier_1");
		
		Calendar c1 = new Calendar();
			c1.setTitle("Titre calendrier_2");
			c1.setLink("lienCalendrier_2");	
				
		ArrayList<Calendar> listeCal = new ArrayList<Calendar>(); 
	
		listeCal.add(c);
		listeCal.add(c1);
	
		return listeCal;
		
	}

	@Override
	public ArrayList<Calendar> getListFuturesCalendars() {
		//TODO remplacer les valeurs en dur		
		Calendar c = new Calendar();
			c.setTitle("Titre calendrier à venir n°1");
			c.setLink("lienCalendrier_1");
		
		Calendar c1 = new Calendar();
			c1.setTitle("Titre calendrier à venir n°2");
			c1.setLink("lienCalendrier_2");	
				
		ArrayList<Calendar> listeCal = new ArrayList<Calendar>(); 
	
		listeCal.add(c);
		listeCal.add(c1);
	
		return listeCal;
	}
	
}
