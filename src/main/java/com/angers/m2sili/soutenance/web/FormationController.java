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
import com.angers.m2sili.soutenance.web.dto.FormationDTO;
import com.angers.m2sili.soutenance.web.dto.ReturnValueDTO;

/**
 * Controller de Formation.
 * 
 * @author pierre evers
 * 
 */

@Controller
@RequestMapping(value = "/formation")
public class FormationController extends BaseController {

	@Autowired
	private FormationService formationService;

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	ReturnValueDTO create(@RequestBody FormationDTO formation) {
		ReturnValueDTO returnValue = new ReturnValueDTO();

		if (formationService.findByName(formation.getName()) != null) {
			returnValue.setError("Cette formation existe déjà");
		} else {
			Formation p = new Formation();
			p.setName(formation.getName());
			p = formationService.create(p);
			returnValue.setValue(p);
		}

		return returnValue;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		formationService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	FormationDTO get(@PathVariable Integer id) {
		return formationService.getAsDTO(id);
	}

	@RequestMapping(value = "/admin_list", method = RequestMethod.GET)
	public @ResponseBody
	List<Formation> getAllAdmin() {
		return formationService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	Formation update(@RequestBody FormationDTO formation) {
		Formation p = formationService.get(Integer.parseInt(formation.getId()));
		p.setName(formation.getName());

		return formationService.update(p);
	}
}
