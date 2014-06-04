package com.angers.m2sili.soutenance.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.SecurityService;
import com.angers.m2sili.soutenance.service.UserService;

/**
 * Classe d'implémentation du service de Security.
 * 
 * @author jean grimonprez
 * 
 */

@Service
public class SecurityServiceImpl implements SecurityService {

	@Autowired
	private UserService userService;

	@Override
	public UserDetails retrieve() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		if (authentication == null
				|| !(authentication.getPrincipal() instanceof UserDetails)) {
			return null;
		}

		return (UserDetails) authentication.getPrincipal();
	}

	@Override
	public User retrieveUser() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		if (authentication == null
				|| !(authentication.getPrincipal() instanceof UserDetails)) {
			return null;
		}

		UserDetails details = (UserDetails) authentication.getPrincipal();
		User user = userService.findByLogin(details.getUsername());

		return user;
	}

}
