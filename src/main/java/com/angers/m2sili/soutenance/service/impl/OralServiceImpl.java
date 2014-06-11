package com.angers.m2sili.soutenance.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
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
import com.angers.m2sili.soutenance.web.dto.OralDTO;

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
	@Transactional(readOnly = true)
	public Set<Oral> getUserOrals(Integer user_id, Integer calendar_id) {
		logger.debug("Recupération des Oraux du user " + user_id);
		User user = userRepository.findOne(user_id);
		Calendar calendar = calendarRepository.findOne(calendar_id);
		//return user.getOrals();
		return oralRepository.findAllByUserAndCalendar(user, calendar);
	}

	
	public Set<Oral> getList2() {
		logger.debug("List2");
		return new HashSet<Oral>(oralRepository.findAll());
	}

	@Transactional
	@Override
	public void deleteListOralByCalendarId(Integer id) {
		List<Oral> listOral =	oralRepository.findAllByCalendarId(id);
		
		for(int i = 0 ; i < listOral.size() ; i++){
			Oral o = listOral.get(i);
			o.getUser().getOrals().remove(o);
			oralRepository.delete(o);
		}

	}
	
	@Transactional
	@Override
	public void deleteOralById(Integer id) {
			Oral o = oralRepository.findOne(id);
			o.getUser().getOrals().remove(o);
			oralRepository.delete(o);
	}

	@Override
	@Transactional(readOnly = true)
	public ArrayList<OralDTO> getOralsByCalendar(Calendar cal) {

		ArrayList<OralDTO> listeRetour = new ArrayList<OralDTO>() ;
		Set<Oral>  orals = oralRepository.findAllByCalendar(cal);
		
		//on trie le retour et on garde uniquement les informations qui nous intéressent
	    for (Iterator<Oral> it = orals.iterator(); it.hasNext(); ) {
	        Oral f = it.next();
	        OralDTO o = new OralDTO();
	        	o.setBeginningHour(f.getBeginningHour());
	        	o.setId(f.getId());
	        	o.setUserId(f.getUser().getId());
	        	o.setParticipants(f.getParticipants());
	        	o.setTitle(f.getTitle());
	        	o.setCalendarId(f.getCalendar().getId());
	        	listeRetour.add(o);
	    }
		
		
		return listeRetour;
	}

	public OralDTO getAsDTO(Integer id) {
		Oral oral = oralRepository.findOne(id);
		
		OralDTO dto = new OralDTO();
		dto.setId(oral.getId());
		dto.setBeginningHour(oral.getBeginningHour());
		dto.setParticipants(oral.getParticipants());
		dto.setTitle(oral.getTitle());
		dto.setCalendarId(oral.getCalendar().getId());
		dto.setUserId(oral.getUser().getId());
		
		return dto;
	}
	
}
