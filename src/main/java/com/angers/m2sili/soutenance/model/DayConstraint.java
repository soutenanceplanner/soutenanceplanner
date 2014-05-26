package com.angers.m2sili.soutenance.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Classe de contrainte sur un jour d'un calendrier.
 * 
 * @author typhoon
 * 
 */

@Entity
@Table(name = "day_constraint")
public class DayConstraint extends BaseEntity {

	/**
	 * Serial ID.
	 */
	private static final long serialVersionUID = -6433278782426107714L;

	/**
	 * Date de la contrainte.
	 */
	@NotNull
	@Column(name = "date")
	private Date date;
	
	/**
	 * State de la contrainte.
	 */
	@NotNull
	@Column(name = "state")
	private Boolean state;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Boolean getState() {
		return state;
	}

	public void setState(Boolean state) {
		this.state = state;
	}

}
