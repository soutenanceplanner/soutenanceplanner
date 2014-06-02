package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
import com.angers.m2sili.soutenance.web.dto.ReturnValueDTO;
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

	// @PreAuthorize(value = "denyAll()")
	@RequestMapping(value = "/retrieve", method = RequestMethod.GET)
	public @ResponseBody
	Object authenticatedUser() throws AccessDeniedException {

		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		if (authentication == null
				|| !(authentication.getPrincipal() instanceof UserDetails)) {
			return null;
		}

		return (UserDetails) authentication.getPrincipal();
	}

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public @ResponseBody
	ReturnValueDTO authenticate(@RequestBody AuthenticateDTO dto)
			throws Exception {
		// endpoint for the basic authentication request to pass
		ReturnValueDTO returnValue = new ReturnValueDTO();
//
//		User user = userService.findByLogin(dto.getLogin());
//
//		// Erreur login
//		if (user == null) {
//			returnValue.setError("Utilisateur inexistant");
//			return returnValue;
//		}
//
//		// Password KO
//		if (user.getPassword().compareTo(dto.getPassword()) != 0) {
//			returnValue.setError("Mauvais mot de passe");
//			return returnValue;
//		}
//		// Password OK
//		else {
//			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//					dto.getLogin(), dto.getPassword());
//			Authentication authentication = this.authManager
//					.authenticate(authenticationToken);
//			SecurityContextHolder.getContext()
//					.setAuthentication(authentication);
//
//			/*
//			 * Reload user as password of authentication principal will be null
//			 * after authorization and password is needed for token generation
//			 */
//			UserDetails userDetails = this.customUserDetailsService
//					.loadUserByUsername(dto.getLogin());
//			returnValue.setValue(TokenUtils.createToken(userDetails));
//
//			return returnValue;
//		}
		// endpoint for the basic authentication request to pass
		return returnValue;
	}

}
