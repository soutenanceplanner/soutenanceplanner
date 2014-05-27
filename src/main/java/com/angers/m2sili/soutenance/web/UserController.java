package com.angers.m2sili.soutenance.web;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.model.enumeration.Droit;
import com.angers.m2sili.soutenance.service.UserService;

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
	String create(@RequestBody User user) {
		logger.debug(user.toString());
		//User newUser = userService.create(user);
		//return newUser;
		return "toto";
	}

	@ExceptionHandler
	public void handle(HttpMessageNotReadableException e) {
	    logger.warn("Returning HTTP 400 Bad Request", e);
	}
	
	
	@RequestMapping(value = "/getCalendars", method = RequestMethod.GET)
	public @ResponseBody List<Calendar> create(@RequestBody String id) {
		
			//List<Calendar> listeCalendar = userService.getCalendars(Integer.parseInt(id));	
			return null;
	}

	

}
