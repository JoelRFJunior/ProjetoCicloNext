package com.ciclonext.ciclonext.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_grupo")
public class Grupo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idGrupo;

	@NotEmpty(message = "Campo obrigatório.")
	private String nomeGrupo;

	@NotEmpty(message = "Campo obrigatório.")
	private String descricao;

	@Size(max = 500)
	private String urlImagemGrupo;

	@OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "grupo", "idPostagem" })
	private List<Postagem> postagens = new ArrayList<>();

	@ManyToOne
	@JsonIgnoreProperties({ "gruposCriados", "senha", "idUsuario", "email", "publicacoes","categoria" })
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

}
