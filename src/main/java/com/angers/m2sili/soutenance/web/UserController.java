package com.angers.m2sili.soutenance.web;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
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
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

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

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	User create(@RequestBody String user) throws UnsupportedEncodingException,
			IOException {
		try (Reader reader = new InputStreamReader(new ByteArrayInputStream(
				user.getBytes()), "UTF-8")) {
			Gson gson = new GsonBuilder().create();
			User p = gson.fromJson(reader, User.class);
			System.out.println(p);

			User newUser = userService.create(p);
			return newUser;
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		userService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	User get(@PathVariable Integer id) {
		return userService.get(id);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> list() {
		return userService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	User update(@RequestBody String user) throws UnsupportedEncodingException, IOException {
		try (Reader reader = new InputStreamReader(new ByteArrayInputStream(
				user.getBytes()), "UTF-8")) {
			Gson gson = new GsonBuilder().create();
			User p = gson.fromJson(reader, User.class);
			System.out.println(p);

			User newUser = userService.update(p);
			return newUser;
		}
	}

}
