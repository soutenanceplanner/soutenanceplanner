package com.angers.m2sili.soutenance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angers.m2sili.soutenance.model.User;

/**
 * Repository de User.
 * @author typhoon
 *
 */

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
