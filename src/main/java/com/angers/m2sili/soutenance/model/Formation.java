package com.angers.m2sili.soutenance.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

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

	@OneToMany
	private List<Calendar> ListCalendar;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
