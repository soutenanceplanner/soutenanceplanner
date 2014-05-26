package com.angers.m2sili.soutenance.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

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
	 * Date de la contrainte.
	 */
	@NotNull
	@Column(name = "date")
	private Date date;

	@NotEmpty
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private int ID ;
	
	/**
	 * State de la contrainte.
	 */
	@NotNull
	@Column(name = "state")
	private Boolean state;
	
	@OneToOne
	private int Id_Calendar ;

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
