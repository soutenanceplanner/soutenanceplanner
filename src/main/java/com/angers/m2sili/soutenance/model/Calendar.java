package com.angers.m2sili.soutenance.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
	private Integer duration;

	@NotEmpty
	@Column(name = "title")
	private String title;

	@NotEmpty
	@Column(name = "link")
	private String link;

	@OneToOne
	private User user;
	
	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public Calendar(){
	}
	
	@OneToMany
	private List<DayConstraint> ListDayConstraint ;
	
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

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

}
