package com.angers.m2sili.soutenance.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.User;

/**
 * @author pierre
 *
 */

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	
//	@Query("select c from Calendar c where c.ending_date < :currentDate")
	public  List<Calendar> findAllByEndingDateLessThan(Date currentDate);
	public  List<Calendar> findAllByBeginningDateGreaterThan(Date currentDate);
	public 	 List<Calendar> findAllByUser(User user);
	
}
