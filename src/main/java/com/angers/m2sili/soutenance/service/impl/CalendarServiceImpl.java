package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.repository.CalendarRepository;
import com.angers.m2sili.soutenance.repository.OralRepository;
import com.angers.m2sili.soutenance.repository.TimeSlotRepository;
import com.angers.m2sili.soutenance.repository.UserRepository;
import com.angers.m2sili.soutenance.service.CalendarService;
import com.angers.m2sili.soutenance.web.BaseController;

@Service
public class CalendarServiceImpl implements CalendarService{

	@Autowired
	private CalendarRepository calendarRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OralRepository oralRepository;
	
	@Autowired
	private TimeSlotRepository timeSlotRepository;
	
	
	protected final Logger logger = LoggerFactory.getLogger(BaseController.class);

	@Override
	@Transactional
	public Calendar create(Calendar cal) {
		return calendarRepository.save(cal);
	}

	@Override
	@Transactional(readOnly = true)
	public Calendar get(int idCal) {
		return calendarRepository.findById(idCal);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Calendar> getAll() {
		return calendarRepository.findAll();
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Calendar> getAll(String login) {
		
		User user = userRepository.findByLogin(login);
		
		return calendarRepository.findAllByUser(user);
	}

	@Override
	public List<Calendar> getAllFuturs() {
		//Date courante
		java.util.Calendar cal = java.util.Calendar.getInstance();
		java.util.Date utilDate = cal.getTime();
		java.sql.Date sqlDate =  new java.sql.Date(utilDate.getTime());
		
		logger.debug("Recupération des Calendriers passés avant : "+sqlDate);
		
		return calendarRepository.findAllByBeginningDateGreaterThan(sqlDate);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		
		Calendar c = calendarRepository.findById(id);
			
			c.getFormation().getCalendars().remove(c);			
			c.getUser().getCalendars().remove(c);
			c.getUser().getOrals().removeAll(c.getOrals());
			
		calendarRepository.delete(c);
		
	}

	@Override
	public Calendar update(Calendar calendar) {
		return calendarRepository.save(calendar);
	}

	@Override
	public List<Calendar> getAllPast() {
		//Date courante
		java.util.Calendar cal = java.util.Calendar.getInstance();
		java.util.Date utilDate = cal.getTime();
		java.sql.Date sqlDate =  new java.sql.Date(utilDate.getTime());
		
		logger.debug("Recupération des Calendriers passés avant : "+sqlDate);
		
		return calendarRepository.findAllByEndingDateLessThan(sqlDate);
	}
	
}
