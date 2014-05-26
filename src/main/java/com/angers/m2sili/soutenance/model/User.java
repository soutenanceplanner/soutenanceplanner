package com.angers.m2sili.soutenance.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.data.annotation.Id;

import com.angers.m2sili.soutenance.model.enumeration.Droit;

/**
 * Classe qui définit un utilisateur.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "user")
public class User extends BaseEntity {


	@NotEmpty
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private int ID;
	
	@NotEmpty
	private String login;
	
	@NotEmpty
	//@Pattern(regexp="")
	@SafeHtml
	private String password;
	
	@NotEmpty
	@Email
	private String mail;
	
	@NotNull
	@Enumerated(EnumType.ORDINAL)
	private Droit flag;

	@OneToMany
	private List<Calendar> listeCalendrier ;
	
	@OneToMany
	private List<Oral> listeOral ;
	
	public List<Oral> getListeOral() {
		return listeOral;
	}

	public void setListeOral(List<Oral> listeOral) {
		this.listeOral = listeOral;
	}

	public int getID() {
		return ID;
	}

	public List<Calendar> getListeCalendrier() {
		return listeCalendrier;
	}

	public void setListeCalendrier(List<Calendar> listeCalendrier) {
		this.listeCalendrier = listeCalendrier;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Droit getFlag() {
		return flag;
	}

	public void setFlag(Droit flag) {
		this.flag = flag;
	}

}
