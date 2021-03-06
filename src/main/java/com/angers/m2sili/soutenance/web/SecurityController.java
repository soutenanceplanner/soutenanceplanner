package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.SecurityService;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;
import com.angers.m2sili.soutenance.web.dto.ReturnValueDTO;

@Controller
@RequestMapping(value = "/security")
public class SecurityController extends BaseController {

	@Autowired
	private SecurityService securityService;

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/retrieve", method = RequestMethod.GET)
	public @ResponseBody
	UserDetails authenticatedUser() throws AccessDeniedException {

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

	@RequestMapping(value = "/attemptLogin", method = RequestMethod.POST)
	public @ResponseBody
	ReturnValueDTO attemptLogin(@RequestBody AuthenticateDTO dto)
			throws Exception {

		ReturnValueDTO returnValue = new ReturnValueDTO();
		if (dto.getLogin() == null || dto.getPassword() == null) {
			returnValue.setError("Champs manquants");
			return returnValue;
		}

		User user = userService.findByLogin(dto.getLogin());
		if (user == null) {
			returnValue.setError("Utilisateur inconnu");
		} else {
			if (user.getPassword().compareTo(dto.getPassword()) != 0) {
				returnValue.setError("Mot de passe incorrect");
			}
		}

		return returnValue;
	}

}
