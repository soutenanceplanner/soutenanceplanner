package com.angers.m2sili.soutenance.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.User;

/**
 * @author pierre
 *
 */

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	
	public  List<Calendar> findAllByEndingDateLessThan(Date currentDate);
	public  List<Calendar> findAllByBeginningDateGreaterThan(Date currentDate);
	public 	 List<Calendar> findAllByUser(User user);
	public Calendar findById(Integer id);
	public List<Calendar> findAllByFormationName(String formation);

	
}
