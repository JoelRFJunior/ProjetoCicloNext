package com.ciclonext.ciclonext.dtos;

import com.ciclonext.ciclonext.model.util.Categoria;

public class UsuarioLoginDTO {
	
	private Long idUsuario;
	
	private String email;

	private String senha;

	private String token;

	private String urlImagemPerfil;

	private Categoria categoria;
	
	private String nome;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUrlImagemPerfil() {
		return urlImagemPerfil;
	}

	public void setUrlImagemPerfil(String urlImagemPerfil) {
		this.urlImagemPerfil = urlImagemPerfil;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	
	
}
