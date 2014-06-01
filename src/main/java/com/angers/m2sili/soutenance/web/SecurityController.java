package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.AuthenticateDTO;
import com.angers.m2sili.soutenance.web.dto.ReturnValueDTO;

@Controller
@RequestMapping(value = "/security")
public class SecurityController extends BaseController {

	@Autowired
	private UserService userService;

	@PreAuthorize(value = "denyAll()")
	@RequestMapping(value = "/retrieve", method = RequestMethod.GET)
	public @ResponseBody
	Object authenticatedUser() {
		return null;
		// Authentication authentication =
		// SecurityContextHolder.getContext().getAuthentication();
		// if(authentication == null || !(authentication.getPrincipal()
		// instanceof UserDetails)) {
		// return null;
		// }
		// return (UserDetails)authentication.getPrincipal();
	}

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public @ResponseBody
	ReturnValueDTO authenticate(@RequestBody AuthenticateDTO dto) throws Exception {
		// endpoint for the basic authentication request to pass
		ReturnValueDTO returnValue = new ReturnValueDTO();
		
		User user = userService.findByLogin(dto.getLogin());

		// Erreur login
		if (user == null) {
			returnValue.setError("Utilisateur inexistant");
		}

		// Password KO
		if (user.getPassword().compareTo(dto.getPassword()) != 0) {
			
			returnValue.setError("Mauvais mot de passe");
		}
		// Password OK
		else {
			returnValue.setValue(user);
		}

		return returnValue;
	}

}
