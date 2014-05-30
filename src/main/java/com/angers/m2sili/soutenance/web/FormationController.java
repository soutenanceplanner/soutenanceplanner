package com.angers.m2sili.soutenance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.service.FormationService;

/**
 * Controller de Formation.
 * 
 * @author pierre evers
 * 
 */

@Controller
//@PreAuthorize("isAuthenticated()")
@RequestMapping(value = "/formation")
public class FormationController extends BaseController {
	
	@Autowired
	private FormationService formationService;
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Formation create(@RequestBody Formation formation) {
		Formation newFormation = formationService.create(formation);
		return newFormation;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		formationService.delete(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Formation get(@PathVariable Integer id) {
		return formationService.get(id);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<Formation> list() {
		return formationService.getAll();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	Formation update(@RequestBody Formation formation) {
		return formationService.update(formation);
	}
	
}
