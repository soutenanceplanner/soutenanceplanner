package com.angers.m2sili.soutenance.web.dto;

public class AuthenticateDTO {
	
	private String login;
	
	private String password;
	
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

	public AuthenticateDTO(){
	}

}
