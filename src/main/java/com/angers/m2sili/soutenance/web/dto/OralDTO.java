package com.angers.m2sili.soutenance.web.dto;

public class OralDTO {

	private Integer id;

	private String title;

	private Integer beginningHour;

	private String participants;

	private Integer userId;

	private Integer calendarId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getBeginningHour() {
		return beginningHour;
	}

	public void setBeginningHour(Integer beginningHour) {
		this.beginningHour = beginningHour;
	}

	public String getParticipants() {
		return participants;
	}

	public void setParticipants(String participants) {
		this.participants = participants;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCalendarId() {
		return calendarId;
	}

	public void setCalendarId(Integer calendarId) {
		this.calendarId = calendarId;
	}

}
