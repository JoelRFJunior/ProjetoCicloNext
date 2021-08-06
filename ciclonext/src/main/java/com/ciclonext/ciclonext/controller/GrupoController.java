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
import com.ciclonext.ciclonext.model.util.Categoria;
import com.ciclonext.ciclonext.repository.GrupoRepository;
import com.ciclonext.ciclonext.services.GrupoService;
import com.ciclonext.ciclonext.services.UsuarioService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/grupo")
public class GrupoController {

	private @Autowired GrupoRepository repositoryG;

	private @Autowired GrupoService service;

	private @Autowired UsuarioService serviceU;

	@GetMapping("/getAll") // Método para pegar tudo
	public ResponseEntity<List<Grupo>> findAll() {

		return ResponseEntity.ok(repositoryG.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Grupo> findById(@PathVariable Long id) {

		return repositoryG.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}

	/*
	 * @PostMapping("/{idUsuario}") public ResponseEntity<Object>
	 * criarGrupo(@Valid @PathVariable (value = "idUsuario") Long
	 * idUsuario, @RequestBody Grupo novoGrupo) {
	 * 
	 * Optional<Grupo> cadastrarGrupo = serviceU.criarGrupo(idUsuario, novoGrupo);
	 * 
	 * if (cadastrarGrupo.isEmpty()) { return
	 * ResponseEntity.status(HttpStatus.BAD_REQUEST).
	 * body("Grupo já existente, ou criador inválido. Tente novamente.");
	 * 
	 * } else { return
	 * ResponseEntity.status(HttpStatus.CREATED).body("O grupo "+novoGrupo.
	 * getNomeGrupo()+ " foi criado com sucesso.");
	 * 
	 * }
	 * 
	 * }
	 */

	/*
	 * @PutMapping("/{id}/atualizar") public ResponseEntity<Grupo>
	 * putGrupo(@Valid @PathVariable(value = "id") Long id,
	 * 
	 * @Valid @RequestBody Grupo grupoParaAtualizar) {
	 * 
	 * return service.atualizarGrupo(id, grupoParaAtualizar) .map(grupoAtualizado ->
	 * ResponseEntity.ok().body(grupoAtualizado))
	 * .orElse(ResponseEntity.badRequest().build());
	 * 
	 * }
	 */

	@DeleteMapping("/{id}")
	public void deletarGrupo(@PathVariable Long id) {

		repositoryG.deleteById(id);

	}

	@GetMapping("/nome/{nomeGrupo}")
	public ResponseEntity<List<Grupo>> encontrarPorNomeGrupo(@PathVariable String nomeGrupo) {
		return ResponseEntity.ok().body(repositoryG.findAllByNomeGrupoContainingIgnoreCase(nomeGrupo));
	}
	
	@PutMapping
	public ResponseEntity<Grupo> alterarGrupo(@RequestBody Grupo grupoParaAtualizar){
		return ResponseEntity.ok().body(repositoryG.save(grupoParaAtualizar));
	}

	@PostMapping
	public ResponseEntity<Grupo> criarGrupo2(@RequestBody Grupo grupoCriado){
		
		return ResponseEntity.ok().body(repositoryG.save(grupoCriado));
	}
}