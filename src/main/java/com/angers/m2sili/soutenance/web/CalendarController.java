package com.angers.m2sili.soutenance.web;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.TimeSlot;
import com.angers.m2sili.soutenance.service.CalendarService;
import com.angers.m2sili.soutenance.service.FormationService;
import com.angers.m2sili.soutenance.service.TimeSlotService;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.CalendarDTO;


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
	private FormationService forServiceImpl;
	
	@Autowired
	private UserService userServiceImpl;
	
	@Autowired
	private TimeSlotService timeSlotServiceImpl;


	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Calendar create(@RequestBody CalendarDTO calendar) {
		logger.debug("REST - Création d'un Calendrier " + calendar.getTitle());
		Calendar c = new Calendar();
		c.setTitle(calendar.getTitle());
		c.setBeginningDate(calendar.getBeginningDate());
		c.setEndingDate(calendar.getEndingDate());
		c.setDuration(calendar.getDuration());
		c.setLink(calendar.getLink());
		c.setFormation(forServiceImpl.get(calendar.getFormationId()));
		c.setUser(userServiceImpl.get(calendar.getUserId()));
		c = calServiceImpl.create(c);
		for(int i=0; i<calendar.getTimeSlots().size(); ++i) {
			TimeSlot ts = new TimeSlot();
			ts.setBeginningHour(calendar.getTimeSlots().get(i).getBeginningHour());
			ts.setEndingHour(calendar.getTimeSlots().get(i).getEndingHour());
			ts.setCalendar(c);
			timeSlotServiceImpl.create(ts);
		}
		return c;
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

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<Calendar> getAll(@PathVariable String user_login) {
		/*
		 * On récupère le login
		  
		 
		  Authentication authentication = SecurityContextHolder.getContext()
		  .getAuthentication(); if (authentication == null ||
		  !(authentication.getPrincipal() instanceof UserDetails)) { return
		  null; }
		  
		  UserDetails user = (UserDetails) authentication.getPrincipal();
		  
		  user.login();
		*/ 
		return calServiceImpl.getAll("admin1");
	}

	@RequestMapping(value = "/list_futur", method = RequestMethod.GET)
	public @ResponseBody
	List<Calendar> getFuturCalendars() {
		return calServiceImpl.getAllFuturs();
	}

	@RequestMapping(value = "/list_past", method = RequestMethod.GET)
	public @ResponseBody
	List<Calendar> getPastCalendars() {
		return calServiceImpl.getAllPast();
	}

}
