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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciclonext.ciclonext.dtos.UsuarioDTO;
import com.ciclonext.ciclonext.model.Usuario;
import com.ciclonext.ciclonext.repository.UsuarioRepository;
import com.ciclonext.ciclonext.services.UsuarioService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repositoryU;

	@Autowired
	private UsuarioService service;

	@GetMapping("/getAll") // Método para pegar tudo
	public ResponseEntity<List<Usuario>> findAll() {

		return ResponseEntity.ok(repositoryU.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Usuario> findById(@PathVariable long id) {

		return repositoryU.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Object> postUsuario(@Valid @RequestBody Usuario novoUsuario) {

		Optional<Object> cadastrarUsuario = service.cadastrarUsuario(novoUsuario);

		if (cadastrarUsuario.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário já existente!");

		} else {
			return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado.");

		}

	}

	@PutMapping("/{id}/atualizar")
	public ResponseEntity<Usuario> putUsuario(@Valid @PathVariable(value = "id") Long id,
			@Valid @RequestBody UsuarioDTO usuarioParaAtualizar) {

		return service.atualizarUsuario(id, usuarioParaAtualizar)
				.map(usuarioAtualizado -> ResponseEntity.ok().body(usuarioAtualizado))
				.orElse(ResponseEntity.badRequest().build());

	}

	@DeleteMapping("/{id}")
	public void deletarUsuario(@PathVariable long id) {

		repositoryU.deleteById(id);

	}

	@GetMapping("/nome/{nome}")
	public ResponseEntity<List<Usuario>> encontrarPorNome(@PathVariable  String nome) {

		return ResponseEntity.ok().body(repositoryU.findAllByNomeContainingIgnoreCase(nome));
	}
}
