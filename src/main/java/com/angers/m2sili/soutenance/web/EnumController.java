package com.angers.m2sili.soutenance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.service.EnumService;
import com.angers.m2sili.soutenance.web.dto.EnumDTO;

@Controller
@RequestMapping(value = "/enum")
public class EnumController {
	
	@Autowired
	private EnumService enumService;
	
	@RequestMapping(value = "/droit", method = RequestMethod.GET)
	public @ResponseBody
	List<EnumDTO> create(){
		return enumService.Droit();
	}

}
