package com.angers.m2sili.soutenance.web;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.Oral;
import com.angers.m2sili.soutenance.service.OralService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Controller de Oral.
 * 
 * @author Benoît Caufriez
 * 
 */

@Controller
@RequestMapping(value = "/oral")
public class OralController extends BaseController {
	
	@Autowired
	private OralService oralService;
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	Oral create(@RequestBody String oral) throws UnsupportedEncodingException, IOException {
		try (Reader reader = new InputStreamReader(new ByteArrayInputStream(
				oral.getBytes()), "UTF-8")) {
			Gson gson = new GsonBuilder().create();
			Oral p = gson.fromJson(reader, Oral.class);
			System.out.println(p);

			return oralService.create(p);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		oralService.delete(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Oral get(@PathVariable Integer id) {
		return oralService.get(id);
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	Set<Oral> list() {
		return oralService.getAll();
	}
	
	@RequestMapping(value = "/list/{user_id}", method = RequestMethod.GET)
	public @ResponseBody
	Set<Oral> userList(@PathVariable Integer user_id) {
		return oralService.getUserOrals(user_id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	Oral update(@RequestBody String oral) throws UnsupportedEncodingException, IOException {
		try (Reader reader = new InputStreamReader(new ByteArrayInputStream(
				oral.getBytes()), "UTF-8")) {
			Gson gson = new GsonBuilder().create();
			Oral p = gson.fromJson(reader, Oral.class);
			System.out.println(p);

			return oralService.update(p);
		}
	}
	
}
