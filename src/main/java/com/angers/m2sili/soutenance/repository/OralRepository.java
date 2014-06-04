package com.angers.m2sili.soutenance.repository;

import java.util.List;

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

	List<Oral> findAllByUser(User user);

	List<Oral> findAllByUserAndCalendar(User user, Calendar calendar);

}
