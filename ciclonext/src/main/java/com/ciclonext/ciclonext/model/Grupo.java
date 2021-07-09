package com.ciclonext.ciclonext.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
import javax.validation.constraints.NotEmpty;

import com.ciclonext.ciclonext.model.util.Categoria;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_grupo")
public class Grupo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idGrupo;

	@NotEmpty(message = "Campo obrigatório.")
	private String nomeGrupo;

	@Enumerated(EnumType.STRING)
	private Categoria categoria;

	@NotEmpty(message = "Campo obrigatório.")
	private String descricao;

	private String urlImagemGrupo;

	@OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "grupo", "idPostagem" })
	private List<Postagem> postagens = new ArrayList<>();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "Membros", joinColumns = @JoinColumn(name = "seguidor_id"), inverseJoinColumns = @JoinColumn(name = "grupo_id"))
	@JsonIgnoreProperties({ "idUsuario", "senha", "email", "urlImagemPerfil", "gruposCriados", "gruposQueSeguimos",
			"seguindo", "publicacoes", "seguidores" })
	private List<Usuario> seguidores = new ArrayList<>();

	@ManyToOne
	@JsonIgnoreProperties({ "gruposCriados", "senha", "idUsuario" })
	private Usuario criador;

	public Long getIdGrupo() {
		return idGrupo;
	}

	public void setIdGrupo(Long idGrupo) {
		this.idGrupo = idGrupo;
	}

	public String getNomeGrupo() {
		return nomeGrupo;
	}

	public void setNomeGrupo(String nomeGrupo) {
		this.nomeGrupo = nomeGrupo;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getUrlImagemGrupo() {
		return urlImagemGrupo;
	}

	public void setUrlImagemGrupo(String urlImagemGrupo) {
		this.urlImagemGrupo = urlImagemGrupo;
	}

	public List<Postagem> getPostagens() {
		return postagens;
	}

	public void setPostagens(List<Postagem> postagens) {
		this.postagens = postagens;
	}

	public Usuario getCriador() {
		return criador;
	}

	public void setCriador(Usuario criador) {
		this.criador = criador;
	}

	public List<Usuario> getSeguidores() {
		return seguidores;
	}

	public void setSeguidores(List<Usuario> seguidores) {
		this.seguidores = seguidores;
	}

}
