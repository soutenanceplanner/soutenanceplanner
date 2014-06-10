package com.angers.m2sili.soutenance.service;

import com.angers.m2sili.soutenance.model.TimeSlot;

public interface TimeSlotService {
	
	public TimeSlot create(TimeSlot timeSlot);
	public TimeSlot get(Integer id);

	void deleteListTimeSlotByCalendarId(Integer id);

	
}
