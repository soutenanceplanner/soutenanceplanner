package com.angers.m2sili.soutenance.web.dto;

public class EnumDTO{

	/**
	 * Valeur dans l'énum.
	 */
	private int value;
	
	/**
	 * Nom dans l'énum.
	 */
	private String name;
	
	public EnumDTO(){
	}
	
	public EnumDTO(int value, String name){
		this.value = value;
		this.name = name;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
