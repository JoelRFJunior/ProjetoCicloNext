package com.ciclonext.ciclonext.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ciclonext.ciclonext.model.Usuario;

public class UserDetailsImplements implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String userEmail;
	private String password;
	private List<GrantedAuthority> autorizacoes;
	
	
	public UserDetailsImplements(Usuario usuario) {
		this.userEmail = usuario.getEmail();
		this.password = usuario.getSenha();
	}
	
	public UserDetailsImplements() {
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return autorizacoes;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return userEmail;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
