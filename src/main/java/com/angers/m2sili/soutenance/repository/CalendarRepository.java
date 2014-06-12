package com.angers.m2sili.soutenance.repository;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
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
	public List<Calendar> findAllByBeginningDateLessThanAndEndingDateGreaterThan(Date currentDate,Date currentDate1);
	public List<Calendar> findAllByOrals(Set<Oral> orals);

	
}
