package com.angers.m2sili.soutenance.web.dto;

public class EnumDTO{

	/**
	 * Valeur dans l'énum.
	 */
	private String value;
	
	/**
	 * Nom dans l'énum.
	 */
	private String name;
	
	public EnumDTO(){
	}
	
	public EnumDTO(String value, String name){
		this.value = value;
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
