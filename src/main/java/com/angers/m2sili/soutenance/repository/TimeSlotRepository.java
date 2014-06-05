package com.angers.m2sili.soutenance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.angers.m2sili.soutenance.model.TimeSlot;

public interface TimeSlotRepository  extends JpaRepository<TimeSlot, Integer>{

	
	public List<TimeSlot> findAllByCalendarId(Integer id);
}
