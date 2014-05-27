package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.User;

/**
 * Interface du service de User.
 * @author typhoon
 *
 */

public interface UserService {

	public User create(User user);
	
	public void delete(Integer id);

	User get(Integer id);
	
	List<User> getAll();

}
