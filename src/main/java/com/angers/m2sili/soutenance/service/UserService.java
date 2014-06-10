package com.angers.m2sili.soutenance.service;

import java.util.List;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.web.dto.UserDTO;

/**
 * Interface du service de User.
 * @author typhoon
 *
 */

public interface UserService {

	User create(User user);
	
	void delete(Integer id);

	UserDTO getAsDTO(Integer id);
	
	User get(Integer id);
	
	List<User> getAll();
	
	User update(User user);
	
	User findByLogin(String login);

	User getUserByMail(String mail);
	
	//User findByMail(String mail);
}
