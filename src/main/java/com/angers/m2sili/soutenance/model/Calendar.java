package com.angers.m2sili.soutenance.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Classe d'un calendrier.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "calendar")
public class Calendar extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2940098450745307194L;

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
	@NotNull
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	@ManyToOne
	@NotNull
	@JoinColumn(name = "formation_id")
	@JsonBackReference
	private Formation formation;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "calendar", fetch = FetchType.EAGER)
	@JsonManagedReference
	private Set<TimeSlot> timeSlots;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "calendar", fetch = FetchType.EAGER)
	@JsonManagedReference
	private Set<Oral> orals;

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

	/**
	 * Manipulation sur les plages horaires
	 */

	public Set<TimeSlot> getTimeSlots() {
		if (this.timeSlots == null) {
			this.timeSlots = new HashSet<TimeSlot>();
		}
		return this.timeSlots;
	}

	public void setTimeSlots(Set<TimeSlot> timeSlots) {
		this.timeSlots = timeSlots;
	}

	public void addTimeSlot(TimeSlot timeSlot) {
		getTimeSlots().add(timeSlot);
	}

	/**
	 * Manipulation sur les oraux
	 */
	public Set<Oral> getOrals() {
		if (this.orals == null) {
			this.orals = new HashSet<Oral>();
		}
		return orals;
	}

	public void setOrals(Set<Oral> orals) {
		this.orals = orals;
	}

	public void addOral(Oral oral) {
		getOrals().add(oral);
	}

}
