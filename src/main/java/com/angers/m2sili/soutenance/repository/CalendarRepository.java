package com.angers.m2sili.soutenance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.angers.m2sili.soutenance.model.Calendar;

/**
 * @author pierre
 *
 */

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {

}
