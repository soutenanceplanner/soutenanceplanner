package com.angers.m2sili.soutenance.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.repository.FormationRepository;
import com.angers.m2sili.soutenance.service.FormationService;

@Service
public class FormationServiceImpl implements FormationService {

	@Autowired
	private FormationRepository formationRepository;

	@Override
	public Formation create(Formation formation) {
		return formationRepository.save(formation);
	}

	@Override
	public void delete(Integer id) {
		formationRepository.delete(id);
	}

	@Override
	public Formation get(Integer id) {
		return formationRepository.findOne(id);
	}

	@Override
	public List<Formation> getAll() {
		return formationRepository.findAll();
	}

}
