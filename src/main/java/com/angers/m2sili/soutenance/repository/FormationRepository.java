package com.angers.m2sili.soutenance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angers.m2sili.soutenance.model.Formation;

/**
 * Repository de Formation.
 * @author pierre evers
 *
 */

@Repository
public interface FormationRepository extends JpaRepository<Formation, Integer> {
	
	public Formation findByName(String name);

}
