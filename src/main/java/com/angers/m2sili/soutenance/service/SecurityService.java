package com.angers.m2sili.soutenance.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.angers.m2sili.soutenance.model.User;

public interface SecurityService {
	
	public UserDetails retrieve();
	
	public User retrieveUser();

}
