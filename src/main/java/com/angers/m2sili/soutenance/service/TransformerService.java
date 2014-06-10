package com.angers.m2sili.soutenance.service;

import com.angers.m2sili.soutenance.model.Calendar;
import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.model.TimeSlot;
import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.web.dto.CalendarDTO;
import com.angers.m2sili.soutenance.web.dto.OralDTO;
import com.angers.m2sili.soutenance.web.dto.TimeSlotDTO;
import com.angers.m2sili.soutenance.web.dto.UserDTO;

public interface TransformerService {
	
	/**
	 * Calendar
	 */
	public CalendarDTO beanToDto(Calendar bean);
	public Calendar dtoToBean(CalendarDTO dto);
	
	/**
	 * TimeSlot
	 */
	public TimeSlotDTO beanToDto(TimeSlot bean);
	public TimeSlot dtoToBean(TimeSlotDTO dto);
	
	/**
	 * Oral
	 */
	public OralDTO beanToDto(Oral bean);
	public Oral dtoToBean(OralDTO dto);
	
	/**
	 * User
	 */
	
	public UserDTO beanToDto(User user);
	
}
