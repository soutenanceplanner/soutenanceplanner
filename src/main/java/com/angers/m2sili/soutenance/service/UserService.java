package com.angers.m2sili.soutenance.service;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.model.enumeration.Droit;

/**
 * Interface du service de User.
 * @author typhoon
 *
 */

public interface UserService {

	public User create(String login, String password, String mail, Droit flag);

}
