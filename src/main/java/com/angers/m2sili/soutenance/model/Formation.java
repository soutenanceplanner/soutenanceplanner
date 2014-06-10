package com.angers.m2sili.soutenance.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * Classe pour représenter la formation associée à un calendrier.
 * 
 * @author typhoon
 * 
 */

@Entity
@Table(name = "formation")
public class Formation extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -390060889523898283L;
	@NotEmpty
	@Column(name = "name", unique = true)
	private String name;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "formation", fetch = FetchType.EAGER)
	@JsonManagedReference
	private Set<Calendar> calendars = new HashSet<Calendar>();

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public Formation() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Calendar> getCalendars() {
		return calendars;
	}

	public void setCalendars(Set<Calendar> calendars) {
		this.calendars = calendars;
	}

}
