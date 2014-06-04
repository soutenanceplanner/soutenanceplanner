package com.angers.m2sili.soutenance.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * Classe qui définit un créneau de soutenance sur un jour donné.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "time_slot")
public class TimeSlot extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3301303780864412448L;
	
	@NotNull
	@Column(name = "beginning_hour")
	private Integer beginningHour;

	@NotNull
	@Column(name = "ending_hour")
	private Integer endingHour;

	@ManyToOne
	@NotNull
	@JoinColumn(name = "calendar_id")
	@JsonBackReference
	private Calendar calendar;

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public TimeSlot() {
	}

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

	public Calendar getCalendar() {
		return calendar;
	}

	public void setCalendar(Calendar calendar) {
		this.calendar = calendar;
	}

}
