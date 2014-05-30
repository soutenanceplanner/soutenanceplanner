package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.service.UserService;

@Controller
@RequestMapping(value="/security")
public class SecurityController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/retrieve", method = RequestMethod.GET)
	public @ResponseBody Object authenticatedUser() {
		return null;
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		if(authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
//			return null;
//		}
//		return (UserDetails)authentication.getPrincipal();
	}
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public void authenticate() {
		// endpoint for the basic authentication request to pass
	}

}
