package com.angers.m2sili.soutenance.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.FactoryService;

@Controller
@RequestMapping(value = "/factory")
public class FactoryController extends BaseController {
	
	@Autowired
	private FactoryService factoryService;
	
	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public @ResponseBody
	User user(){
		return factoryService.user();
	}
	
	@RequestMapping(value = "/formation", method = RequestMethod.GET)
	public @ResponseBody
	Formation formation(){
		return factoryService.formation();
	}
	
	@RequestMapping(value = "/oral", method = RequestMethod.GET)
	public @ResponseBody
	Oral oral(){
		return factoryService.oral();
	}

}
