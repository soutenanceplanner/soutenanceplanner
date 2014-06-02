package com.angers.m2sili.soutenance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.service.OralService;

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
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Oral create(@RequestBody Oral oral) {
		Oral newOral = oralService.create(oral);
		return newOral;
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
	List<Oral> list() {
		return oralService.getAll();
	}
	
	@RequestMapping(value = "/list/{user_id}", method = RequestMethod.GET)
	public @ResponseBody
	List<Oral> userList(@PathVariable Integer user_id) {
		return oralService.getUserOral(user_id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	Oral update(@RequestBody Oral oral) {
		return oralService.update(oral);
	}
	
}
