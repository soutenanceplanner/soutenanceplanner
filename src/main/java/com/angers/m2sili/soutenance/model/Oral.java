package com.angers.m2sili.soutenance.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * Classe qui définit un oral durant une période de soutenance.
 * 
 * @author typhoon
 * 
 */

@Entity
@Table(name = "oral")
public class Oral extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3388675967371001907L;

	@NotEmpty
	@Column(name = "title")
	private String title;

	@NotNull
	@Column(name = "beginning_hour")
	private Integer beginningHour;

	@NotNull
	@Column(name = "participants")
	private String participants;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	@ManyToOne
	@JoinColumn(name = "calendar_id")
	@JsonBackReference
	private Calendar calendar;

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public Oral() {
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Calendar getCalendar() {
		return calendar;
	}

	public void setCalendar(Calendar calendar) {
		this.calendar = calendar;
	}

}
