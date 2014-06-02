package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.repository.CalendarRepository;
import com.angers.m2sili.soutenance.service.CalendarService;

@Service
public class CalendarServiceImpl implements CalendarService{

	@Autowired
	private CalendarRepository calendarRepository;

	@Override
	@Transactional
	public Calendar create(Calendar cal) {
		return calendarRepository.save(cal);
	}

	@Override
	@Transactional(readOnly = true)
	public Calendar get(int idCal) {
		return calendarRepository.findOne(idCal);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Calendar> getAll() {
		return calendarRepository.findAll();
	}

	@Override
	public List<Calendar> getAllFuturs() {
		return calendarRepository.findAll();
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		calendarRepository.delete(id);
	}

	@Override
	public Calendar update(Calendar calendar) {
		return calendarRepository.save(calendar);
	}

	@Override
	public List<Calendar> getAllPast() {
		return calendarRepository.findAll();
	}
	
}
