package com.angers.m2sili.soutenance.web.dto;

public class ReturnValueDTO {

	/**
	 * Valeur de retour.
	 */
	private Object value;

	/**
	 * Erreur renvoyée.
	 */
	private String error;

	public ReturnValueDTO() {
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

}
