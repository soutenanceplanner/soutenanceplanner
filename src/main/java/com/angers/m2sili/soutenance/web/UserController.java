package com.angers.m2sili.soutenance.web;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.UserService;

/**
 * Controller de User.
 * 
 * @author typhoon
 * 
 */

@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {
	
	@Autowired
	private UserService userService;
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	User create(@RequestBody User user) {
		User newUser = userService.create(user);
		return newUser;
	}
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		userService.delete(id);
	}
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	User get(@PathVariable Integer id) {
		return userService.get(id);
	}
	
	@PreAuthorize("denyAll()")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> list() {
		return userService.getAll();
	}
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	User update(@RequestBody User user) {
		return userService.update(user);
	}
	
	
	
	///
	
	@RequestMapping(value = "/authenticated/retrieve", method = RequestMethod.GET)
	public UserDetails authenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
			return null;
		}
		return (UserDetails)authentication.getPrincipal();
	}
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public void authenticate() {
		// endpoint for the basic authentication request to pass
	}
	
}
