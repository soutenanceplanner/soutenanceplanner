package com.angers.m2sili.soutenance.web;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Calendar;
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
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	User create(@RequestBody User user) {

		logger.debug(user.toString());
		User newUser = userService.create(user);
		return newUser;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		logger.debug(id.toString());
		userService.delete(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	User get(@PathVariable Integer id) {
		return userService.get(id);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> list() {
		logger.debug("test");
		List<User> users = userService.getAll();
		return userService.getAll();
	}
	

	/*@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> list() {
		return userService.getAll();
		this.logger.debug(user.toString());
		User newUser = userService.create(user);
		return newUser;
	}
	*/
	
}
