package com.ciclonext.ciclonext.dtos;

import javax.validation.constraints.NotEmpty;

public class UsuarioDTO {
	
	@NotEmpty(message = "Preencha com o nome que quer ser chamado.")
	private String nome;
	
	@NotEmpty(message = "Para sua segurança, digite uma senha.")
	private String senha;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
	

}
