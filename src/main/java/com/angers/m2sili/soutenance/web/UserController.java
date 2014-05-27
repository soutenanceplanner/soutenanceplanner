package com.angers.m2sili.soutenance.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.EnumDTO;

/**
 * Controller de User.
 * 
 * @author typhoon
 * 
 */

@Controller
@RequestMapping(value = "/user")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	String create(@RequestBody EnumDTO user) {
		logger.debug(user.toString());
		//User newUser = userService.create(user);
		//return newUser;
		return "toto";
	}
	
	@ExceptionHandler
	public void handle(HttpMessageNotReadableException e) {
	    logger.warn("Returning HTTP 400 Bad Request", e);
	}

}
