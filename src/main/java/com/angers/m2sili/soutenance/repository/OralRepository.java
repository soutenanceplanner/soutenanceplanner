package com.angers.m2sili.soutenance.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;

/**
 * Repository de User.
 * @author typhoon
 *
 */

@Repository
public interface OralRepository extends JpaRepository<Oral, Integer> {

	public List<Oral> findAllByCalendarId(Integer id);
	Set<Oral> findAllByUser(User user);
	Set<Oral> findAllByUserAndCalendar(User user, Calendar calendar);
	Set<Oral> findAllByCalendar(Calendar cal);

}
