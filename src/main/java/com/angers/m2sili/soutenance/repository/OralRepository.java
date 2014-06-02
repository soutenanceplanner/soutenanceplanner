package com.angers.m2sili.soutenance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angers.m2sili.soutenance.model.Oral;

/**
 * Repository de User.
 * @author typhoon
 *
 */

@Repository
public interface OralRepository extends JpaRepository<Oral, Integer> {

}
