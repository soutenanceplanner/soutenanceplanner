package com.angers.m2sili.soutenance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angers.m2sili.soutenance.model.User;
import com.angers.m2sili.soutenance.service.TransformerService;
import com.angers.m2sili.soutenance.service.UserService;
import com.angers.m2sili.soutenance.service.impl.TransformerServiceImpl;
import com.angers.m2sili.soutenance.web.dto.ReturnValueDTO;
import com.angers.m2sili.soutenance.web.dto.UserDTO;

/**
 * Controller de User.
 * 
 * @author typhoon
 * 
 */

@Controller
@PreAuthorize("isAuthenticated()")
@RequestMapping(value = "/user")
public class UserController extends BaseController {

	@Autowired
	private UserService userService;

	@Autowired
	private TransformerService transformService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	User create(@RequestBody UserDTO dto) {

		User user = new User();
		user.setLogin(dto.getLogin());
		user.setPassword(dto.getPassword());
		user.setMail(dto.getMail());
		user.setFlag(dto.getFlag());

		User newUser = userService.create(user);
		return newUser;
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void delete(@PathVariable Integer id) {
		userService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	UserDTO get(@PathVariable Integer id) {
		return userService.getAsDTO(id);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/admin_list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> getAllAdmin() {
		return userService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	ReturnValueDTO update(@RequestBody UserDTO dto) {
		User user = userService.get(Integer.parseInt(dto.getId()));
		ReturnValueDTO retour = new ReturnValueDTO();
		User mail = null ;
		//si le mail n'est pas identique on verifie si il est pas déjà utilisé
		if(!dto.getMail().equals(user.getMail())){
			 mail =	userService.getUserByMail(dto.getMail());
			if(mail != null){
				retour.setError("Le mail est déjà utilisé par un utilisateur !");
			}
		}
		
		if(mail == null){
			user.setPassword(dto.getPassword());
			user.setMail(dto.getMail());
			
			try{	
				User u = userService.update(user);
				retour.setValue(u);
			}catch(Exception e){
				retour.setError("Le mail est déjà utilisé par un utilisateur !");
			}
		}
		return retour ;
	}

}
