package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.TimeSlot;

public interface TimeSlotService {
	
	public TimeSlot create(TimeSlot timeSlot);
	public TimeSlot get(Integer id);
	public TimeSlot getByCalendarId(Integer calendar_id);
	public List<TimeSlot> getAll();
	void delete(Integer id);
	TimeSlot update(TimeSlot timeSlot);

	void deleteListTimeSlotByCalendarId(Integer id);

	
}
