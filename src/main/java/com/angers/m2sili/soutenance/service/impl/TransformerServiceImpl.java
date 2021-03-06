package com.angers.m2sili.soutenance.service.impl;


import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Formation;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.TimeSlot;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.CalendarService;
import com.angers.m2sili.soutenance.service.FormationService;
import com.angers.m2sili.soutenance.service.OralService;
import com.angers.m2sili.soutenance.service.TimeSlotService;
import com.angers.m2sili.soutenance.service.TransformerService;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.web.dto.CalendarDTO;
import com.angers.m2sili.soutenance.web.dto.CalendarDTOFull;
import com.angers.m2sili.soutenance.web.dto.FormationDTO;
import com.angers.m2sili.soutenance.web.dto.OralDTO;
import com.angers.m2sili.soutenance.web.dto.TimeSlotDTO;
import com.angers.m2sili.soutenance.web.dto.UserDTO;

@Service
public class TransformerServiceImpl implements TransformerService {

	@Autowired
	private TimeSlotService timeSlotService;

	@Autowired
	private CalendarService calendarService;

	@Autowired
	private OralService oralService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private FormationService formationService;

	@Override
	public CalendarDTO beanToDto(Calendar bean) {
		CalendarDTO dto = new CalendarDTO();
		dto.setId(bean.getId());
		dto.setBeginningDate(bean.getBeginningDate());
		dto.setDuration(bean.getDuration());
		dto.setEndingDate(bean.getEndingDate());
		dto.setFormationId(bean.getFormation().getId());
		dto.setLink(bean.getLink());
		dto.setTitle(bean.getTitle());
		dto.setUserId(bean.getUser().getId());

		ArrayList<TimeSlotDTO> slots = new ArrayList<TimeSlotDTO>();
		for (TimeSlot slot : bean.getTimeSlots()) {
			slots.add(beanToDto(slot));
		}
		dto.setTimeSlots(slots);

		ArrayList<OralDTO> oraux = new ArrayList<OralDTO>();
		for (Oral oral : bean.getOrals()) {
			oraux.add(beanToDto(oral));
		}
		dto.setTimeSlots(slots);
		return dto;
	}
	
	@Override
	public CalendarDTOFull beanToDto2(Calendar bean) {
		CalendarDTOFull dto = new CalendarDTOFull();
		dto.setId(bean.getId());
		dto.setBeginningDate(bean.getBeginningDate());
		dto.setDuration(bean.getDuration());
		dto.setEndingDate(bean.getEndingDate());
		
		Formation formation = bean.getFormation();
		FormationDTO formationDTO = new FormationDTO();
		formationDTO.setId(formation.getId().toString());
		formationDTO.setName(formation.getName());
		dto.setFormation(formationDTO);
		
		dto.setLink(bean.getLink());
		dto.setTitle(bean.getTitle());
		
		UserDTO userDTO = new UserDTO();
		userDTO.setId(bean.getUser().getId().toString());
		userDTO.setFlag(bean.getUser().getFlag());
		userDTO.setLogin(bean.getUser().getLogin());
		userDTO.setMail(bean.getUser().getMail());
		dto.setUser(userDTO);

		ArrayList<TimeSlotDTO> slots = new ArrayList<TimeSlotDTO>();
		for (TimeSlot slot : bean.getTimeSlots()) {
			slots.add(beanToDto(slot));
		}
		dto.setTimeSlots(slots);

		ArrayList<OralDTO> oraux = new ArrayList<OralDTO>();
		for (Oral oral : bean.getOrals()) {
			oraux.add(beanToDto(oral));
		}
		dto.setTimeSlots(slots);
		return dto;
	}

	@Override
	public Calendar dtoToBean(CalendarDTO dto) {
		Calendar bean = calendarService.get(dto.getId());

		bean.setBeginningDate(dto.getBeginningDate());
		bean.setDuration(dto.getDuration());
		bean.setEndingDate(dto.getEndingDate());
		
		Formation formation = formationService.get(dto.getFormationId());
		bean.setFormation(formation);
		
		User user = userService.get(dto.getUserId());
		bean.setUser(user);
		
		bean.setId(dto.getId());
		bean.setLink(dto.getLink());
		
		ArrayList<TimeSlot> timeSlots = new ArrayList<TimeSlot>();
		for (TimeSlotDTO slotDTO : dto.getTimeSlots()) {
			timeSlots.add(dtoToBean(slotDTO));
		}
		bean.setTimeSlots(new HashSet<>(timeSlots));
		
		ArrayList<Oral> oraux = new ArrayList<Oral>();
		for (OralDTO oralDTO : dto.getOrals()) {
			oraux.add(dtoToBean(oralDTO));
		}
		bean.setOrals(new HashSet<>(oraux));

		return bean;
	}

	@Override
	public TimeSlotDTO beanToDto(TimeSlot bean) {
		TimeSlotDTO dto = new TimeSlotDTO();
		dto.setId(bean.getId());
		dto.setCalendarId(bean.getCalendar().getId());
		dto.setBeginningHour(bean.getBeginningHour());
		dto.setEndingHour(bean.getEndingHour());
		return dto;
	}

	@Override
	public TimeSlot dtoToBean(TimeSlotDTO dto) {
		TimeSlot bean = timeSlotService.get(dto.getId());

		bean.setId(dto.getId());
		Calendar calendar = calendarService.get(dto.getCalendarId());
		bean.setCalendar(calendar);
		bean.setBeginningHour(dto.getBeginningHour());
		bean.setEndingHour(dto.getEndingHour());

		return bean;
	}

	@Override
	public OralDTO beanToDto(Oral bean) {
		OralDTO dto = new OralDTO();
		dto.setBeginningHour(bean.getBeginningHour());
		dto.setCalendarId(bean.getCalendar().getId());
		dto.setId(bean.getId());
		dto.setParticipants(bean.getParticipants());
		dto.setTitle(bean.getTitle());
		dto.setUserId(bean.getUser().getId());

		return dto;
	}

	@Override
	public Oral dtoToBean(OralDTO dto) {
		Oral bean = oralService.get(dto.getId());

			bean.setBeginningHour(dto.getBeginningHour());
			Calendar calendar = calendarService.get(dto.getCalendarId());
			bean.setCalendar(calendar);
			bean.setId(dto.getId());
			bean.setParticipants(dto.getParticipants());
			bean.setTitle(dto.getTitle());
		
		User user = userService.get(dto.getUserId());
			bean.setUser(user);

		return bean;
	}

	@Override
	public UserDTO beanToDto(User user) {
		UserDTO userdto = new UserDTO();
				userdto.setId(user.getId()+"");
				userdto.setLogin(user.getLogin());
				userdto.setMail(user.getMail());
		return userdto;
	}

}
