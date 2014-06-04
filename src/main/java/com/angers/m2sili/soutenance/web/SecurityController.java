package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.SecurityService;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;

@Controller
@RequestMapping(value = "/security")
public class SecurityController extends BaseController {

	@Autowired
	private SecurityService securityService;

	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@RequestMapping(value = "/retrieve", method = RequestMethod.GET)
	public @ResponseBody
	UserDetails authenticatedUser() throws AccessDeniedException {

		logger.debug("authentication retrieve");

		return securityService.retrieve();
	}

	@RequestMapping(value = "/retrieveUser", method = RequestMethod.GET)
	public @ResponseBody
	User authenticatedModelUser() throws AccessDeniedException {

		return securityService.retrieveUser();
	}

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public @ResponseBody
	void authenticate(@RequestBody AuthenticateDTO dto) throws Exception {
		// endpoint for the basic authentication request to pass
	}

}
