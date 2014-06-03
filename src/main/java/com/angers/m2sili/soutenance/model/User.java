package com.angers.m2sili.soutenance.model;

import java.util.ArrayList;
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
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Classe qui définit un utilisateur.
 * 
 * @author typhoon
 */

@Entity
@Table(name = "user")
public class User extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4494720847310940601L;

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
	@JsonManagedReference
	private List<Calendar> calendars;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.EAGER)
	@JsonManagedReference
	private List<Oral> orals;

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

	public List<Calendar> getCalendars() {
		if(this.calendars == null) {
			calendars = new ArrayList<Calendar>();
		}
		return calendars;
	}

	public void setCalendars(List<Calendar> calendars) {
		this.calendars = calendars;
	}

	public List<Oral> getOrals() {
		if(this.orals == null) {
			orals = new ArrayList<Oral>();
		}
		return orals;
	}

	public void setOrals(List<Oral> orals) {
		this.orals = orals;
	}

}
