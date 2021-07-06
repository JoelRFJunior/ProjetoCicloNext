package com.ciclonext.ciclonext.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciclonext.ciclonext.model.Grupo;
import com.ciclonext.ciclonext.model.util.Categoria;


@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Long> {
	
	public List<Grupo> findAllByCategoria(Categoria categoria);
	
	Optional<Grupo> findByNomeGrupo(String nomeGrupo);
	
	public List<Grupo> findAllByNomeGrupoContainingIgnoreCase(String nomeGrupo);
	
	
}
