package com.angers.m2sili.soutenance.model.example;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.angers.m2sili.soutenance.model.BaseEntity;

@Entity
@Table(name="formation")
public class Formation extends BaseEntity {
	
	@NotNull
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
