package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.TimeSlot;
import com.angers.m2sili.soutenance.repository.TimeSlotRepository;
import com.angers.m2sili.soutenance.service.TimeSlotService;


@Service
public class TimeSlotServiceImpl implements TimeSlotService {
	
	@Autowired
	private TimeSlotRepository timeSlotRepository;

	@Override
	public TimeSlot create(TimeSlot timeSlot) {
		return timeSlotRepository.save(timeSlot);
	}

	@Override
	public TimeSlot get(Integer id) {
		return timeSlotRepository.findOne(id);
	}

	@Override
	public TimeSlot getByCalendarId(Integer calendar_id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TimeSlot> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public TimeSlot update(TimeSlot timeSlot) {
		// TODO Auto-generated method stub
		return null;
	}

}
