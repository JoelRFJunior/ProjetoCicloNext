package com.ciclonext.ciclonext.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedBy;
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

import com.ciclonext.ciclonext.model.Postagem;
import com.ciclonext.ciclonext.repository.PostagemRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/postagem")
public class PostagemController {

	private @Autowired PostagemRepository repositoryP;

	@GetMapping("/getAll")
	public ResponseEntity<List<Postagem>> findAll() {

		return ResponseEntity.ok(repositoryP.findAll());

	}

	@GetMapping("/{id}")
	public ResponseEntity<Postagem> findById(@PathVariable long id) {

		return repositoryP.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());

	}

	@PostMapping
	public ResponseEntity<Postagem> postPostagem(@Valid @RequestBody Postagem novaPostagem) {

		return ResponseEntity.status(HttpStatus.CREATED).body(repositoryP.save(novaPostagem));

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
	
	

}
