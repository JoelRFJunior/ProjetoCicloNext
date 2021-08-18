package com.ciclonext.ciclonext.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.ciclonext.ciclonext.model.util.TipoPostagem;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_postagem")
public class Postagem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idPostagem;

	@NotEmpty(message = "Escreva aqui o texto da sua postagem.")
	@Size(max = 500)
	private String corpo;

	@Size(max = 500)
	private String urlImagemVideo;

//	@Enumerated(EnumType.STRING)
	private String tipoPostagem;

	@Temporal(TemporalType.TIMESTAMP)
	private Date data = new java.sql.Date(System.currentTimeMillis());

	@ManyToOne
	@JsonIgnoreProperties({"grupo","gruposCriados","postagens", "publicacoes" })
	private Grupo grupo;
	//
	@ManyToOne
	@JsonIgnoreProperties({"criador","gruposCriados", "publicacoes", "autor"})
	private Usuario autor;
//,"postagens", "grupo",
	public Long getIdPostagem() {
		return idPostagem;
	}

	public void setIdPostagem(Long idPostagem) {
		this.idPostagem = idPostagem;
	}

	public String getCorpo() {
		return corpo;
	}

	public void setCorpo(String corpo) {
		this.corpo = corpo;
	}

	public String getUrlImagemVideo() {
		return urlImagemVideo;
	}

	public void setUrlImagemVideo(String urlImagemVideo) {
		this.urlImagemVideo = urlImagemVideo;
	}

//	public TipoPostagem getTipoPostagem() {
//		return tipoPostagem;
//	}
//
//	public void setTipoPostagem(TipoPostagem tipoPostagem) {
//		this.tipoPostagem = tipoPostagem;
//	}
	
	

	public Date getData() {
		return data;
	}

	public String getTipoPostagem() {
		return tipoPostagem;
	}

	public void setTipoPostagem(String tipoPostagem) {
		this.tipoPostagem = tipoPostagem;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

}
