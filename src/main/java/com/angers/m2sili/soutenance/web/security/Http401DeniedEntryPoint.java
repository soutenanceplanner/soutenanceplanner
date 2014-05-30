package com.angers.m2sili.soutenance.web.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Just return 401-unauthorized for every unauthorized request. The client side
 * catches this and handles login itself.
 */
public class Http401DeniedEntryPoint implements AuthenticationEntryPoint {

	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied");
	}

}