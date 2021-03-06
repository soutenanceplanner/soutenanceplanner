package com.angers.m2sili.soutenance.web.dto;

import java.util.ArrayList;
import java.util.Date;

public class CalendarDTO {

	private Integer id;
	private String title;
	private Date beginningDate;
	private Date endingDate;
	private float duration;
	private Integer userId;
	private Integer formationId;
	private String link;
	private ArrayList<TimeSlotDTO> timeSlots;
	private ArrayList<OralDTO> orals;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getBeginningDate() {
		return beginningDate;
	}

	public void setBeginningDate(Date beginningDate) {
		this.beginningDate = beginningDate;
	}

	public Date getEndingDate() {
		return endingDate;
	}

	public void setEndingDate(Date endingDate) {
		this.endingDate = endingDate;
	}

	public float getDuration() {
		return duration;
	}

	public void setDuration(float duration) {
		this.duration = duration;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getFormationId() {
		return formationId;
	}

	public void setFormationId(Integer formationId) {
		this.formationId = formationId;
	}

	public ArrayList<TimeSlotDTO> getTimeSlots() {
		return this.timeSlots;
	}

	public void setTimeSlots(ArrayList<TimeSlotDTO> timeSlots) {
		this.timeSlots = timeSlots;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ArrayList<OralDTO> getOrals() {
		return orals;
	}

	public void setOrals(ArrayList<OralDTO> orals) {
		this.orals = orals;
	}

	// public Formation getFormation() {
	// return formation;
	// }
	//
	// public void setFormation(Formation formation) {
	// this.formation = formation;
	// }
	//
	// public User getUser() {
	// return user;
	// }
	//
	// public void setUser(User user) {
	// this.user = user;
	// }

}
