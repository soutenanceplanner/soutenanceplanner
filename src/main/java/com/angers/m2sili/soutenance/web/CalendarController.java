package com.angers.m2sili.soutenance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.service.CalendarService;

/**
 * 
 * @author maxime desmauts
 *
 */

@Controller
@RequestMapping(value = "/calendar")
public class CalendarController extends BaseController {

	@Autowired
	private CalendarService calServiceImpl;
		
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Calendar create(@RequestBody Calendar calendar) {
		return calServiceImpl.create(calendar);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	Calendar update(@RequestBody Calendar calendar) {
		return calServiceImpl.update(calendar);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		calServiceImpl.delete(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Calendar get(@PathVariable Integer id) {
		return calServiceImpl.get(id);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody List<Calendar> getAll() {
				
		/*
		 * On récupère le login
		 * 
		 * Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		if (authentication == null
				|| !(authentication.getPrincipal() instanceof UserDetails)) {
			return null;
		}

		UserDetails user = (UserDetails) authentication.getPrincipal();
		
		user.login();
		*/
		
		
		return calServiceImpl.getAll("admin1"); 
	}
	
	@RequestMapping(value = "/list_futur", method = RequestMethod.GET)
	public @ResponseBody List<Calendar> getFuturCalendars() {
		return calServiceImpl.getAllFuturs();
	}
	
	@RequestMapping(value = "/list_past", method = RequestMethod.GET)
	public @ResponseBody List<Calendar> getPastCalendars() {
		return calServiceImpl.getAllPast();
	}
	
	
}
