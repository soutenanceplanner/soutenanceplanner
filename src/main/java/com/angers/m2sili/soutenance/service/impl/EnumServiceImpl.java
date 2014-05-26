package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.enumeration.Droit;
import com.angers.m2sili.soutenance.service.EnumService;
import com.angers.m2sili.soutenance.web.dto.EnumDTO;

/**
 * Classe d'implémentation de EnumService.
 * @author typhoon
 *
 */

@Service
public class EnumServiceImpl implements EnumService{

	@Override
	public List<EnumDTO> Droit() {
		return Droit.getAsList();
	}
	
	

}
