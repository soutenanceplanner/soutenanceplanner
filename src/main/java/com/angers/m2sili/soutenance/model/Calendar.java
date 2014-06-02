package com.angers.m2sili.soutenance.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Classe d'un calendrier.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "calendar")
public class Calendar extends BaseEntity {

	@NotNull
	@Column(name = "beginning_date")
	private Date beginningDate;

	@NotNull
	@Column(name = "ending_date")
	private Date endingDate;

	@NotNull
	@Column(name = "duration")
	private Float duration;

	@NotEmpty
	@Column(name = "title")
	private String title;

	@NotEmpty
	@Column(name = "link")
	private String link;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "formation_id")
	private Formation formation;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "calendar", fetch = FetchType.EAGER)
	private List<TimeSlot> listeTimeSlot;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "calendar", fetch = FetchType.EAGER)
	private List<Oral> listeOral;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Formation getFormation() {
		return formation;
	}

	public void setFormation(Formation formation) {
		this.formation = formation;
	}

	public List<TimeSlot> getListeTimeSlot() {
		return listeTimeSlot;
	}

	public void setListeTimeSlot(List<TimeSlot> listeTimeSlot) {
		this.listeTimeSlot = listeTimeSlot;
	}

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public Calendar() {
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
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

	public Float getDuration() {
		return duration;
	}

	public void setDuration(Float duration) {
		this.duration = duration;
	}

}
