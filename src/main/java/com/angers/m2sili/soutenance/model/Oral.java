package com.angers.m2sili.soutenance.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Classe qui définit un oral durant une période de soutenance.
 * 
 * @author typhoon
 * 
 */

@Entity
@Table(name = "oral")
public class Oral extends BaseEntity {

	@NotEmpty
	private String title;

	@NotNull
	private Date beginningHour;

	// TODO : revoir ce modèle
	@NotNull
	private String participants;

	@ManyToOne
	@JoinColumn(name = "user_id")
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

	public String getParticipants() {
		return participants;
	}

	public void setParticipants(String participants) {
		this.participants = participants;
	}

}
