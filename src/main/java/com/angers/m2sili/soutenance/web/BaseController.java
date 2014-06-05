package com.angers.m2sili.soutenance.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

public class BaseController {
	
	protected final Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	@ExceptionHandler
	public void handle(HttpMessageNotReadableException e) throws Exception {
	    logger.warn("Returning HTTP 400 Bad Request", e);
	    throw e;
	}
	
	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public void handle(AccessDeniedException e) throws Exception {
	    logger.warn("Returning HTTP 401 Access Denied");
	}
	
	@ExceptionHandler
	public void handle(Exception e) throws Exception {
	    logger.warn("General Controller Exception", e);
	    throw e;
	}

}
