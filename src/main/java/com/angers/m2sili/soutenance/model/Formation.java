package com.angers.m2sili.soutenance.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Classe pour représenter la formation associée à un calendrier.
 * 
 * @author typhoon
 * 
 */

@Entity
@Table(name = "formation")
public class Formation extends BaseEntity {

	@NotEmpty
	@Column(name = "name")
	private String name;

<<<<<<< HEAD
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "formation", fetch = FetchType.EAGER)
	private List<Calendar> listeCalendrier;

	public List<Calendar> getListeCalendrier() {
		return listeCalendrier;
	}

	public void setListeCalendrier(List<Calendar> listeCalendrier) {
		this.listeCalendrier = listeCalendrier;
	}
=======
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "formation", fetch = FetchType.LAZY)
	private List<Calendar> ListCalendar;
>>>>>>> branch 'dev' of git@github.com:soutenanceplanner/soutenanceplanner.git

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

	public List<Calendar> getListCalendar() {
		return ListCalendar;
	}

	public void setListCalendar(List<Calendar> listCalendar) {
		ListCalendar = listCalendar;
	}

}
