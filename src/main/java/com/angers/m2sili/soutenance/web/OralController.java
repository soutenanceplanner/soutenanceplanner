package com.angers.m2sili.soutenance.web;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.CalendarService;
import com.angers.m2sili.soutenance.service.OralService;
import com.angers.m2sili.soutenance.service.SecurityService;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.OralDTO;

/**
 * Controller de Oral.
 * 
 * @author Benoît Caufriez
 * 
 */

@Controller
@RequestMapping(value = "/oral")
public class OralController extends BaseController {
	
	@Autowired
	private OralService oralService;
	
	@Autowired
	private UserService userServiceImpl;
	
	@Autowired
	private CalendarService calendarServiceImpl;
	
	@Autowired
	private SecurityService securityServiceImpl;
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Oral create(@RequestBody OralDTO oral) {
		logger.debug("REST - Création d'un oral");
		Oral o = new Oral();
		o.setBeginningHour(oral.getBeginning_hour());
		o.setParticipants(oral.getParticipants());
		o.setTitle(oral.getTitle());
		o.setCalendar(calendarServiceImpl.get(oral.getCalendarId()));
		o.setUser(userServiceImpl.get(oral.getUserId()));
		return oralService.create(o);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		oralService.delete(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Oral get(@PathVariable Integer id) {
		return oralService.get(id);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	Set<Oral> list() {
		System.out.println("################# DEBUG #################");
		return new HashSet<Oral>(oralService.getAll());
	}
	
	@RequestMapping(value = "/list2", method = RequestMethod.GET)
	public @ResponseBody
	Set<Oral> getList2() {
		System.out.println("################# DEBUG #################");
		return oralService.getList2();
	}
	
	@RequestMapping(value = "/list/{user_id}/{calendar_id}", method = RequestMethod.GET)
	public @ResponseBody
	Set<Oral> userList(@PathVariable Integer user_id, @PathVariable Integer calendar_id) {
		User user = securityServiceImpl.retrieveUser();
		if(user == null)
			return null;
		return new HashSet<Oral>(oralService.getUserOrals(user.getId(), calendar_id));
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	Oral update(@RequestBody OralDTO oral) {
		Oral o = oralService.get(oral.getId());
		o.setBeginningHour(oral.getBeginning_hour());
		o.setParticipants(oral.getParticipants());
		o.setTitle(oral.getTitle());
		o.setCalendar(calendarServiceImpl.get(oral.getCalendarId()));
		o.setUser(userServiceImpl.get(oral.getUserId()));
		
		return oralService.update(o);
	}
	
}
