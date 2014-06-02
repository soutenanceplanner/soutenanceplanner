package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;
import com.angers.m2sili.soutenance.web.security.CustomUserDetailsService;

@Controller
@RequestMapping(value = "/security")
public class SecurityController extends BaseController {

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private UserService userService;

	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@RequestMapping(value = "/retrieve", method = RequestMethod.GET)
	public @ResponseBody
	UserDetails authenticatedUser() throws AccessDeniedException {

		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		if (authentication == null
				|| !(authentication.getPrincipal() instanceof UserDetails)) {
			return null;
		}

		return (UserDetails) authentication.getPrincipal();
	}

	@RequestMapping(value = "/retrieveUser", method = RequestMethod.GET)
	public @ResponseBody
	User authenticatedModelUser() throws AccessDeniedException {

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

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public @ResponseBody
	void authenticate(@RequestBody AuthenticateDTO dto) throws Exception {
		// endpoint for the basic authentication request to pass
	}

}
