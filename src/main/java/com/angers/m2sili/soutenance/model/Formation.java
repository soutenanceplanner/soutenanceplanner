package com.angers.m2sili.soutenance.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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

	/**
	 * Serial ID.
	 */
	private static final long serialVersionUID = -8642040419282105136L;

	@NotEmpty
	@Column(name = "name")
	private String name;

	@OneToMany
	private List<Calendar> ListCalendar;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
