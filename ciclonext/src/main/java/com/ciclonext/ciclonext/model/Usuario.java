package com.ciclonext.ciclonext.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.ciclonext.ciclonext.model.util.Categoria;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idUsuario;

	@NotEmpty(message = "Campo obrigatório.")
	private String nome;

	@NotEmpty(message = "Campo obrigatório.")
	private String email;

	@NotEmpty(message = "Campo obrigatório.")
	private String senha;
	
	@Size(max=500)
	private String urlImagemPerfil;
	
	@Enumerated(EnumType.STRING)
	private Categoria categoria; 

	@OneToMany(mappedBy =  "criador", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"grupo","autor", "postagens","gruposCriados", "publicacoes"})
	private List<Grupo> gruposCriados = new ArrayList<>();

	//private Usuario amizade;
	
	//@OneToMany(mappedBy = "amizade")
	//private List<Usuario> amigos = new ArrayList<>();
	
	@OneToMany(mappedBy =  "autor", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"grupo","autor", "criador"," postagens"," gruposCriados", "publicacoes"})
	private List<Postagem> publicacoes = new ArrayList<>();
	
	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public List<Grupo> getGruposCriados() {
		return gruposCriados;
	}

	public void setGruposCriados(List<Grupo> gruposCriados) {
		this.gruposCriados = gruposCriados;
	}

	public List<Postagem> getPublicacoes() {
		return publicacoes;
	}

	public void setPublicacoes(List<Postagem> publicacoes) {
		this.publicacoes = publicacoes;
	}

	public void setSenha(String senha) {
		this.senha = senha;
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

	
}
