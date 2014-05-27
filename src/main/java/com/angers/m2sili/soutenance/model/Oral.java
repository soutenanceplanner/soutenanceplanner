package com.angers.m2sili.soutenance.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Classe qui définit un oral durant une période de soutenance.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "oral")
public class Oral extends BaseEntity {

	@NotEmpty
	private String title;

	@NotNull
	private Date beginningHour;

	@NotNull
	private Date endingHour;

	// TODO : revoir ce modèle
	@NotNull
	private String participants;

	@OneToOne
	private User user ;
	
	@OneToOne
	private Calendar calendar;
	
	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public Oral(){
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getParticipants() {
		return participants;
	}

	public void setParticipants(String participants) {
		this.participants = participants;
	}

}
