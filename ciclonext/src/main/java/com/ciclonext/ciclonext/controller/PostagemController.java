package com.ciclonext.ciclonext.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciclonext.ciclonext.model.Grupo;
import com.ciclonext.ciclonext.model.Postagem;
import com.ciclonext.ciclonext.model.Usuario;
import com.ciclonext.ciclonext.repository.GrupoRepository;
import com.ciclonext.ciclonext.repository.PostagemRepository;
import com.ciclonext.ciclonext.repository.UsuarioRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/postagem")
public class PostagemController {

	private @Autowired PostagemRepository repositoryP;
	private @Autowired UsuarioRepository repositoryU;
	private @Autowired GrupoRepository repositoryG;

	@GetMapping("/getAll")
	public ResponseEntity<List<Postagem>> findAll() {

		return ResponseEntity.ok(repositoryP.findAll());

	}

	@GetMapping("/{id}")
	public ResponseEntity<Postagem> findById(@PathVariable long id) {

		return repositoryP.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());

	}

	@PostMapping("/{idUsuario}/postar/{idGrupo}") //Se não passar um idGrupo será um post do Usuário fora de grupo
	public ResponseEntity<Postagem> postPostagem(@Valid @RequestBody Postagem novaPostagem, 
			@PathVariable(value = "idUsuario") Long idUsuario,
			@PathVariable(value = "idGrupo") Long idGrupo) {

		Optional<Grupo> grupoExistente = repositoryG.findById(idGrupo);
		Optional<Usuario> usuarioExistente = repositoryU.findById(idUsuario);
		if (usuarioExistente.isPresent()) {
			novaPostagem.setAutor(usuarioExistente.get());
			if (grupoExistente.isPresent()) {
				novaPostagem.setGrupo(grupoExistente.get());
			}
			
			return ResponseEntity.status(HttpStatus.CREATED).body(repositoryP.save(novaPostagem));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	
	}

	@PostMapping("/{idUsuario1}/mensagem/{idUsuario2}")
	public ResponseEntity<Postagem> mensagem(@Valid @RequestBody Postagem novaPostagem, 
			@PathVariable(value = "idUsuario1") Long idUsuario1,
			@PathVariable(value = "idUsuario2") Long idUsuario2) {
		
		Optional<Usuario> usuarioExistente1 = repositoryU.findById(idUsuario1);
		Optional<Usuario> usuarioExistente2 = repositoryU.findById(idUsuario2);
		if (usuarioExistente1.isPresent() && usuarioExistente2.isPresent()) {
			novaPostagem.setAutor(usuarioExistente1.get());
			novaPostagem.setUsuarioDestino(usuarioExistente2.get());
						
			return ResponseEntity.status(HttpStatus.CREATED).body(repositoryP.save(novaPostagem));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	
	}

		@PostMapping("/grupo/{id}/postar")
	public ResponseEntity<Postagem> grupoPostagem(@Valid @RequestBody Postagem novaPostagem, @PathVariable Long id ) {

		Optional<Grupo> grupoExistente = repositoryG.findById(id);
		if (grupoExistente.isPresent()) {
			novaPostagem.setAutor(grupoExistente.get().getCriador());
			novaPostagem.setGrupo(grupoExistente.get());
			return ResponseEntity.status(HttpStatus.CREATED).body(repositoryP.save(novaPostagem));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PutMapping ("/{id}/atualizar")
	public ResponseEntity<Postagem> atualizarPostagem (@Valid @RequestBody Postagem postagem, @PathVariable long id) {
		
		return repositoryP.findById(id).map(resp -> { 
			resp.setCorpo(postagem.getCorpo());
			
			resp.setUrlImagemVideo(postagem.getUrlImagemVideo());
			resp.setTipoPostagem(postagem.getTipoPostagem());
			return ResponseEntity.ok().body(repositoryP.save(resp));
			
	}).orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public void delete (@PathVariable long id) {
		
		repositoryP.deleteById(id);
		
	}
	
	@GetMapping("/tipoPostagem/{tipoPostagem}")
	public ResponseEntity<List<Postagem>> encontrarPorTipoPostagem(@PathVariable  String tipoPostagem) {

		return ResponseEntity.ok().body(repositoryP.findAllByTipoPostagem(tipoPostagem));
	}
	

}
