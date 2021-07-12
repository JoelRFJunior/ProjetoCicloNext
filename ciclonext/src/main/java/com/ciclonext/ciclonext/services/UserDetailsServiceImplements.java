package com.ciclonext.ciclonext.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ciclonext.ciclonext.model.Usuario;
import com.ciclonext.ciclonext.repository.UsuarioRepository;
import com.ciclonext.ciclonext.security.UserDetailsImplements;

public class UserDetailsServiceImplements implements UserDetailsService {

	@Autowired
	private UsuarioRepository repositoryU;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<Usuario> user = repositoryU.findByUsuario(username);
		user.orElseThrow(() -> new UsernameNotFoundException (username + "not found."));
		
		return user.map(UserDetailsImplements::new).get();
		
	}

}
