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
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Calendar create(@RequestBody Calendar calendar) {
		Calendar newCalendar = calServiceImpl.create(calendar);
		return newCalendar;
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
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public @ResponseBody List<Calendar> getAll() {
		return calServiceImpl.getAll(); 
	}
	
	@RequestMapping(value = "/list_futur", method = RequestMethod.GET)
	public @ResponseBody List<Calendar> getFuturesCalendars() {
		return calServiceImpl.getAllFuturs();
	}
	
	
	
}
