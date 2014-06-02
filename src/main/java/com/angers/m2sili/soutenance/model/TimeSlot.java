package com.angers.m2sili.soutenance.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


/**
 * Classe qui définit un créneau de soutenance sur un jour donné.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "time_slot")
public class TimeSlot extends BaseEntity {

	@NotNull
	@Column(name = "beginning_hour")
	private Date beginningHour;

	@NotNull
	@Column(name = "ending_hour")
	private Date endingHour;

	@ManyToOne
	@JoinColumn(name = "calendar_id")
	private Calendar calendar;

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public TimeSlot(){
	}

	public Date getBeginningHour() {
		return beginningHour;
	}

	public void setBeginningHour(Date beginningHour) {
		this.beginningHour = beginningHour;
	}

	public Date getEndingHour() {
		return endingHour;
	}

	public void setEndingHour(Date endingHour) {
		this.endingHour = endingHour;
	}
	
	public Calendar getCalendar() {
		return calendar;
	}

	public void setCalendar(Calendar calendar) {
		this.calendar = calendar;
	}

}
