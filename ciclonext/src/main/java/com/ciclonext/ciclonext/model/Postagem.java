package com.ciclonext.ciclonext.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;

import com.ciclonext.ciclonext.model.util.TipoPostagem;

@Entity
@Table(name = "tb_postagem")
public class Postagem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotEmpty
	private String corpo;

	private String urlImagemVideo;

	@NotEmpty
	@Enumerated(EnumType.STRING)
	private TipoPostagem tipoPostagem;

	@Temporal(TemporalType.TIMESTAMP)
	private Date data = new java.sql.Date(System.currentTimeMillis());

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public TipoPostagem getTipoPostagem() {
		return tipoPostagem;
	}

	public void setTipoPostagem(TipoPostagem tipoPostagem) {
		this.tipoPostagem = tipoPostagem;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

}
