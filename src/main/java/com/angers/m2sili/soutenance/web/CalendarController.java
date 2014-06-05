package com.angers.m2sili.soutenance.web;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.TimeSlot;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.CalendarService;
import com.angers.m2sili.soutenance.service.FormationService;
import com.angers.m2sili.soutenance.service.OralService;
import com.angers.m2sili.soutenance.service.SecurityService;
import com.angers.m2sili.soutenance.service.TimeSlotService;
import com.angers.m2sili.soutenance.service.TransformerService;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.service.impl.OralServiceImpl;
import com.angers.m2sili.soutenance.web.dto.CalendarDTO;
import com.angers.m2sili.soutenance.web.dto.ReturnValueDTO;


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
	private SecurityService securityServiceImpl;
	
	@Autowired
	private OralService oralService;
	
	@Autowired
	private TransformerService transformerService;

	@PreAuthorize("isAuthenticated()")
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

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		logger.debug("REST Calendar - supression du calendrier avec id : "+id);
		
		timeSlotServiceImpl.deleteListTimeSlotByCalendarId(id);
		oralService.deleteListOralByCalendarId(id);
		
		calServiceImpl.delete(id);
	}

	@RequestMapping(value = "/{id}/{link}", method = RequestMethod.GET)
	public @ResponseBody
	ReturnValueDTO get(@PathVariable Integer id, @PathVariable String link) {
		ReturnValueDTO dto = new ReturnValueDTO();
		Calendar cal = calServiceImpl.get(id);
		if(!cal.getLink().contentEquals(link)) {
			dto.setError("Non autorisé à accéder au calendrier.");
		} else {
			dto.setValue(transformerService.beanToDto(cal));
		}
		return dto;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/admin_list", method = RequestMethod.GET)
	public @ResponseBody
	List<ReturnValueDTO> getAllAdmin() {
		List<Calendar> cals = calServiceImpl.getAll();
		List<ReturnValueDTO> dtos = new ArrayList<ReturnValueDTO>();
		for(int i=0; i<cals.size(); ++i) {
			ReturnValueDTO dto = new ReturnValueDTO();
			dto.setValue(transformerService.beanToDto(cals.get(i)));
			dtos.add(dto);
		}
		return dtos;
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/user_list", method = RequestMethod.GET)
	public @ResponseBody
	List<Calendar> getAllUser() {
		User user = securityServiceImpl.retrieveUser();
		if(user == null)
			return null;
		return calServiceImpl.getAll(user.getLogin());
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/list_futur", method = RequestMethod.GET)
	public @ResponseBody
	List<Calendar> getFuturCalendars() {
		return calServiceImpl.getAllFuturs();
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/list_past", method = RequestMethod.GET)
	public @ResponseBody
	List<Calendar> getPastCalendars() {
		return calServiceImpl.getAllPast();
	}

}
