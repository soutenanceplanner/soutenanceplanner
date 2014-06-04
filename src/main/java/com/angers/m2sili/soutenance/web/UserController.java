package com.angers.m2sili.soutenance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.UserDTO;
import com.angers.m2sili.soutenance.web.gson.GsonParser;

/**
 * Controller de User.
 * 
 * @author typhoon
 * 
 */

@Controller
// @PreAuthorize("isAuthenticated()")
@RequestMapping(value = "/user")
public class UserController extends BaseController {

	@Autowired
	private UserService userService;

	@Autowired
	private GsonParser gsonParser;

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	User create(@RequestBody UserDTO dto) {

		User user = new User();
		user.setLogin(dto.getLogin());
		user.setPassword(dto.getPassword());
		user.setMail(dto.getMail());
		user.setFlag(dto.getFlag());

		User newUser = userService.create(user);
		return newUser;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		userService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	UserDTO get(@PathVariable Integer id) {
		return userService.getAsDTO(id);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> list() {
		return userService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	User update(@RequestBody UserDTO dto) {
		User user = userService.get(Integer.parseInt(dto.getId()));
		user.setPassword(dto.getPassword());
		user.setMail(dto.getMail());
		
		return userService.update(user);
	}

}
