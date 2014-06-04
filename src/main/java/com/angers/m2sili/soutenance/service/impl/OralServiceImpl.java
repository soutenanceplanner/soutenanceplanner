package com.angers.m2sili.soutenance.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.repository.CalendarRepository;
import com.angers.m2sili.soutenance.repository.OralRepository;
import com.angers.m2sili.soutenance.repository.UserRepository;
import com.angers.m2sili.soutenance.service.OralService;
import com.angers.m2sili.soutenance.web.BaseController;

/**
 * Classe d'implémentation du service de Oral.
 * 
 * @author Benoît Caufriez
 * 
 */

@Service
public class OralServiceImpl implements OralService {

	@Autowired
	private OralRepository oralRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CalendarRepository calendarRepository;
	
	protected final Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	@Override
	@Transactional
	public Oral create(Oral oral) {		
		return oralRepository.save(oral);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		oralRepository.delete(id);
	}
	
	@Override
	@Transactional(readOnly = true)
	public Oral get(Integer id) {
		return oralRepository.findOne(id);
	}

	@Transactional(readOnly = true)
	@Override
	public Set<Oral> getAll() {
		return new HashSet<Oral>(oralRepository.findAll());
	}

	@Override
	public Oral update(Oral oral) {
		return oralRepository.save(oral);
	}

	@Override
	public Set<Oral> getUserOrals(Integer user_id, Integer calendar_id) {
		logger.debug("Recupération des Oraux du user " + user_id);
		User user = userRepository.findOne(user_id);
		Calendar calendar = calendarRepository.findOne(calendar_id);
		//return user.getOrals();
		return new HashSet<Oral>(oralRepository.findAllByUserAndCalendar(user, calendar));
	}

	@Override
	public Set<Oral> getList2() {
		logger.debug("List2");
		return new HashSet<Oral>(oralRepository.findAll());
	}
	
}
