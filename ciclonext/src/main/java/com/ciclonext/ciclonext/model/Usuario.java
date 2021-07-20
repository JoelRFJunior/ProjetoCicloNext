package com.ciclonext.ciclonext.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

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
	@Email
	private String email;

	@NotEmpty(message = "Campo obrigatório.")
	private String senha;
	
	@Size(min=5, max=500)
	private String urlImagemPerfil;

	@OneToMany(mappedBy = "criador", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "idGrupo", "descricao", "urlImagemGrupo", "criador", "postagens" })
	private List<Grupo> gruposCriados = new ArrayList<>();

	@ManyToMany(mappedBy = "seguidores", fetch = FetchType.EAGER)
	@JsonIgnoreProperties({ "idGrupo", "categoria", "descricao", "urlImagemGrupo", "postagens", "seguidores", "criador",
			"gruposQueSeguimos" })
	private List<Grupo> gruposQueSeguimos = new ArrayList<>();
	// private Usuario amizade;

	@OneToMany
	@JoinTable(name = "engajamento", joinColumns = @JoinColumn(name = "seguidor"), inverseJoinColumns = @JoinColumn(name = "influencer"))
	@JsonIgnoreProperties({ "idUsuario", "senha", "email", "urlImagemPerfil", "gruposCriados", "gruposQueSeguimos",
			"seguindo", "publicacoes" })
	private List<Usuario> seguindo = new ArrayList<>();

	@OneToMany(mappedBy = "autor")
	@JsonIgnoreProperties({ "idPostagem", "grupo", "urlImagemVideo", "autor" })
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

	public List<Grupo> getGruposQueSeguimos() {
		return gruposQueSeguimos;
	}

	public void setGruposQueSeguimos(List<Grupo> gruposQueSeguimos) {
		this.gruposQueSeguimos = gruposQueSeguimos;
	}

	public List<Usuario> getSeguindo() {
		return seguindo;
	}

	public void setSeguindo(List<Usuario> seguindo) {
		this.seguindo = seguindo;
	}

}
