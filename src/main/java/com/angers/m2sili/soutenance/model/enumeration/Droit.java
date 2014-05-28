package com.angers.m2sili.soutenance.model.enumeration;

import java.util.ArrayList;
import java.util.List;

import com.angers.m2sili.soutenance.web.dto.EnumDTO;

public enum Droit{

	/**
	 * SUPER-ADMIN.
	 */
	SUPER_ADMIN("Super admin"),
	
	/**
	 * ADMIN.
	 */
	ADMIN("Administrateur"),

	/**
	 * USER.
	 */
	USER("Utilisateur");
	
	private String libelle;
	
	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	Droit(String libelle){
		this.libelle = libelle;
	}
	
	public static List<EnumDTO> getAsList(){
		List<EnumDTO> liste = new ArrayList<EnumDTO>();
		for (Droit droit : Droit.values()){
			liste.add(new EnumDTO(droit.name(), droit.getLibelle()));
		}
		return liste;
	}

}
