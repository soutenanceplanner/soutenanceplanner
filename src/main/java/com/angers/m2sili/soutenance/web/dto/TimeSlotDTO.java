package com.angers.m2sili.soutenance.web.dto;

public class TimeSlotDTO {

	private Integer id;
	private Integer beginningHour;
	private Integer endingHour;
	private Integer calendarId;

	public Integer getBeginningHour() {
		return beginningHour;
	}

	public void setBeginningHour(Integer beginningHour) {
		this.beginningHour = beginningHour;
	}

	public Integer getEndingHour() {
		return endingHour;
	}

	public void setEndingHour(Integer endingHour) {
		this.endingHour = endingHour;
	}

	public Integer getCalendarId() {
		return calendarId;
	}

	public void setCalendarId(Integer calendarId) {
		this.calendarId = calendarId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
