package com.angers.m2sili.soutenance.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.SafeHtml;

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
	@Column(name = "login", unique = true)
	private String login;

	@NotEmpty
	// @Pattern(regexp="")
	@SafeHtml
	@Column(name = "password")
	private String password;

	@NotEmpty
	@Email
	@Column(name = "mail")
	private String mail;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "flag")
	private Droit flag;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.EAGER)
	private List<Calendar> listeCalendrier;

	public List<Calendar> getListeCalendrier() {
		return listeCalendrier;
	}

	public void setListeCalendrier(List<Calendar> listeCalendrier) {
		this.listeCalendrier = listeCalendrier;
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.EAGER)
	private List<Oral> listeOral;

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public User() {
	}

	public List<Oral> getListeOral() {
		return listeOral;
	}

	public void setListeOral(List<Oral> listeOral) {
		this.listeOral = listeOral;
	}

	/**
	 * Constructeur par défaut (obligatoire pour Jackson).
	 */
	public User() {
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
