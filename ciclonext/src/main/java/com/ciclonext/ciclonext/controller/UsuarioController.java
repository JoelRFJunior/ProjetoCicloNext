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

import com.ciclonext.ciclonext.dtos.UsuarioDTO;
import com.ciclonext.ciclonext.dtos.UsuarioLoginDTO;
import com.ciclonext.ciclonext.model.Grupo;
import com.ciclonext.ciclonext.model.Postagem;
import com.ciclonext.ciclonext.model.Usuario;
import com.ciclonext.ciclonext.repository.UsuarioRepository;
import com.ciclonext.ciclonext.services.UsuarioService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

	private @Autowired UsuarioRepository repositoryU;

	private @Autowired UsuarioService service;

	@GetMapping("/getAll") // Método para pegar tudo
	public ResponseEntity<List<Usuario>> findAll() {

		return ResponseEntity.ok(repositoryU.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Usuario> findById(@PathVariable Long id) {

		return repositoryU.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping("/cadastrar")
	public ResponseEntity<Object> postUsuario(@Valid @RequestBody Usuario novoUsuario) {

		Optional<Object> cadastrarUsuario = service.cadastrarUsuario(novoUsuario);

		if (cadastrarUsuario.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(novoUsuario.getEmail() + "\nEmail já foi cadastrado anteriormente!");

		} else {
			return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario.getNome()
					+ "\nUsuário cadastrado.");

		}

	}

	@PostMapping("/{id}/criarGrupo")
	public ResponseEntity<Object> criarGrupo(@Valid @PathVariable(value = "id") Long id, @Valid @RequestBody Grupo novoGrupo) {

		Optional<Grupo> grupoCriado = service.criarGrupo(id, novoGrupo);
		if(grupoCriado.isPresent()) {
			return ResponseEntity.status(HttpStatus.CREATED).body(novoGrupo.getNomeGrupo()+"\nGrupo criado.");
		}
		else {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não foi possível criar o grupo, insira corretamente os dados.");
		}
	}

	@PostMapping("/logar")
	public ResponseEntity<UsuarioLoginDTO> autentication(@RequestBody Optional<UsuarioLoginDTO> user) {
		return service.logar(user).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}

	@PutMapping("/{id}/atualizar")
	public ResponseEntity<?> putUsuario(@Valid @PathVariable(value = "id") Long id,
			@Valid @RequestBody UsuarioDTO usuarioParaAtualizar) {

		Optional<?> usuarioAtualizado = service.atualizarUsuario(id, usuarioParaAtualizar);
		if (usuarioAtualizado.isPresent()) {
			return ResponseEntity.ok().body(usuarioAtualizado);

		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
					usuarioParaAtualizar + "\nProblema ao atualizar " + "usuário, dados inválidos. Tente novamente");
		}

		/*
		 * return service.atualizarUsuario(id, usuarioParaAtualizar)
		 * .map(usuarioAtualizado -> ResponseEntity.ok().body(usuarioAtualizado))
		 * .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
		 */
	}

	@DeleteMapping("/{id}")
	public void deletarUsuario(@PathVariable long id) {

		repositoryU.deleteById(id);

	}

	@GetMapping("/nome/{nome}")
	public ResponseEntity<List<Usuario>> encontrarPorNome(@PathVariable String nome) {

		return ResponseEntity.ok().body(repositoryU.findAllByNomeContainingIgnoreCase(nome));
	}
	
	@PutMapping("/{idUsuario1}/seguir/{idUsuario2}")
	public ResponseEntity<Usuario> seguir(@PathVariable(value = "idUsuario1") Long idUsuario1,
			@PathVariable(value = "idUsuario2") Long idUsuario2) {
		 
		Optional<Usuario> seguidorExistente = service.seguir(idUsuario1, idUsuario2);
				if (seguidorExistente.isPresent()) {
					
		
					return ResponseEntity.status(HttpStatus.OK).body(seguidorExistente.get());
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
				}
	}
}
