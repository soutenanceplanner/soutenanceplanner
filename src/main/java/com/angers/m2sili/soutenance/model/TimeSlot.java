package com.angers.m2sili.soutenance.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
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

	/**
	 * Serial ID.
	 */
	private static final long serialVersionUID = -4390604090909362274L;

	@NotNull
	@Column(name = "beginning_hour")
	private Date beginningHour;

	@NotNull
	@Column(name = "ending_hour")
	private Date endingHour;
	
	

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

}
