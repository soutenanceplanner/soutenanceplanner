package com.angers.m2sili.soutenance.web.dto;

import java.util.Date;

public class OralDTO {

	private Integer id;

	private Date beginning_hour;
	
	private String participants;
	
	private String title;
	
	private Integer calendar_id;

	private Integer user_id;
	
	public OralDTO() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getBeginningHour() {
		return beginning_hour;
	}

	public void setBeginningHour(Date beginning_hour) {
		this.beginning_hour = beginning_hour;
	}

	public String getParticipants() {
		return participants;
	}

	public void setParticipants(String participants) {
		this.participants = participants;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getCalendarId() {
		return calendar_id;
	}

	public void setCalendarId(Integer calendar_id) {
		this.calendar_id = calendar_id;
	}

	public Integer getUserId() {
		return user_id;
	}

	public void setUserId(Integer user_id) {
		this.user_id = user_id;
	}

}
