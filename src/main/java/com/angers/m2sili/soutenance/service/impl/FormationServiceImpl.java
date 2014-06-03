package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.repository.FormationRepository;
import com.angers.m2sili.soutenance.service.FormationService;
import com.angers.m2sili.soutenance.web.dto.FormationDTO;

@Service
public class FormationServiceImpl implements FormationService {

	@Autowired
	private FormationRepository formationRepository;

	@Override
	@Transactional
	public Formation create(Formation formation) {
		return formationRepository.save(formation);
	}

	@Override
	@Transactional(readOnly = true)
	public Formation get(Integer id) {
		return formationRepository.findOne(id);
	}
	
	@Override
	public FormationDTO getAsDTO(Integer id) {
		Formation formation = formationRepository.findOne(id);
		
		FormationDTO dto = new FormationDTO();
		dto.setId(formation.getId().toString());
		dto.setName(formation.getName());
		
		return dto;
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Formation> getAll() {
		return formationRepository.findAll();
	}
	
	@Override
	@Transactional
	public void delete(Integer id) {
		formationRepository.delete(id);
	}	

	@Override
	public Formation update(Formation formation) {
		return formationRepository.save(formation);
	}

}
