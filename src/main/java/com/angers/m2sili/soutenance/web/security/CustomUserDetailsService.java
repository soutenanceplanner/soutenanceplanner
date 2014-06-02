package com.angers.m2sili.soutenance.web.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.UserService;

public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		User user = userService.findByLogin(username);
		
		if(user == null){
			throw new UsernameNotFoundException(username);
		}
		else {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			SimpleGrantedAuthority auth = new SimpleGrantedAuthority(user.getFlag().name());
			authorities.add(auth);
			
			return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), authorities);
		}
	}

}
