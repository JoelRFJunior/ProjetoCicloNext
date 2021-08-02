package com.ciclonext.ciclonext.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciclonext.ciclonext.model.Usuario;
//import com.ciclonext.ciclonext.model.Grupo;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	Optional<Usuario> findByEmail(String email);
	
	public List<Usuario> findAllByNomeContainingIgnoreCase(String nome);

		
	//metodo para um usuário criar um grupo
	//public Optional<Grupo> criarGrupo(Long idUsuario, Grupo grupoParaSerCriado);	
	
}
