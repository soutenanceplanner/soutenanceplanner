package com.angers.m2sili.soutenance.web;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
public class CalendarController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private CalendarService calServiceImpl;
	
	@RequestMapping(value = "/getCalendars", method = RequestMethod.POST)
	public @ResponseBody ArrayList<Calendar> getCalendar(@RequestBody String id) {
		
		logger.info("REST - getCalendars avec l'id :"+id);
			ArrayList<Calendar> listeCal = null ;
				listeCal =	calServiceImpl.getListCalendars(id);
				
		return listeCal ; 
	}
	
	@RequestMapping(value = "/getFuturesCalendars", method = RequestMethod.GET)
	public @ResponseBody ArrayList<Calendar> getFuturesCalendars() {

		logger.info("REST - getFuturesCalendars ");

		ArrayList<Calendar> listeCal = null ;
				listeCal =	calServiceImpl.getListFuturesCalendars();
				
		return listeCal ; 
	}
	
	
	
}
