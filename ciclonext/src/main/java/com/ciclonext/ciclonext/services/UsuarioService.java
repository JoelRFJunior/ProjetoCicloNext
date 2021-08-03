package com.ciclonext.ciclonext.services;

import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ciclonext.ciclonext.dtos.UsuarioDTO;
import com.ciclonext.ciclonext.dtos.UsuarioLoginDTO;
import com.ciclonext.ciclonext.model.Grupo;
import com.ciclonext.ciclonext.model.Usuario;
import com.ciclonext.ciclonext.repository.GrupoRepository;
import com.ciclonext.ciclonext.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repositoryU;
	@Autowired
	private GrupoRepository repositoryG;
	@Autowired
	private GrupoService service;

	public Optional<Object> cadastrarUsuario(Usuario novoUsuario) {

		return repositoryU.findByEmail(novoUsuario.getEmail()).map(usuarioExistente -> {
			return Optional.empty();
		}).orElseGet(() -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

			String senhaEncoder = encoder.encode(novoUsuario.getSenha());
			novoUsuario.setSenha(senhaEncoder);
			return Optional.ofNullable(repositoryU.save(novoUsuario));
		});
	}

	public Optional<?> atualizarUsuario(Long idUsuario, UsuarioDTO usuarioParaAtualizar) {
		return repositoryU.findById(idUsuario).map(usuarioExistente -> {
			usuarioExistente.setNome(usuarioParaAtualizar.getNome());
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String senhaEncoder = encoder.encode(usuarioParaAtualizar.getSenha());
			usuarioExistente.setSenha(senhaEncoder);

			return Optional.ofNullable(repositoryU.save(usuarioExistente));
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}

	// metodo para um usuário criar um grupo
	public Optional<Grupo> criarGrupo(Long idUsuario, Grupo grupoParaSerCriado) {
		Optional<Object> grupoJaExistente = service.verificarGrupo(grupoParaSerCriado);

		if (grupoJaExistente.isPresent()) {
			return repositoryU.findById(idUsuario).map(usuarioExistente -> {
				grupoParaSerCriado.setCriador(usuarioExistente);
				return Optional.ofNullable(repositoryG.save(grupoParaSerCriado));
			}).orElseGet(() -> {
				return Optional.empty();
			});

		} else {
			return Optional.empty();

		}

	}
//Antigo metodo de cadastrar usuario...
	/*
	 * public Usuario CadastrarUsuario(Usuario usuario) { BCryptPasswordEncoder
	 * encoder = new BCryptPasswordEncoder();
	 * 
	 * String senhaEncoder = encoder.encode(usuario.getSenha());
	 * usuario.setSenha(senhaEncoder);
	 * 
	 * return repositoryU.save(usuario); }
	 */

	public Optional<UsuarioLoginDTO> logar(Optional<UsuarioLoginDTO> user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repositoryU.findByEmail(user.get().getEmail());

		if (usuario.isPresent()) {
			if (encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {
				String auth = user.get().getEmail() + ":" + user.get().getSenha();
				byte[] encoderAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encoderAuth);

				user.get().setToken(authHeader);
				user.get().setUrlImagemPerfil(usuario.get().getUrlImagemPerfil());
				user.get().setNome(usuario.get().getNome());
				user.get().setCategoria(usuario.get().getCategoria());
				user.get().setIdUsuario(usuario.get().getIdUsuario());
				
				return user;
			} else {
				return null;
			}

		} else {
			return null;

		}

	}

/*		
	public Optional<Usuario> entrarNoGrupo(Long idUsuario, Long idGrupo) {
        Optional<Grupo> grupoExistente = repositoryG.findById(idGrupo);
        if (grupoExistente.isPresent()) {
            return repositoryU.findById(idUsuario).map(usuarioExistente -> {
                usuarioExistente.getGruposInscritos().add(grupoExistente.get());
                return Optional.ofNullable(repositoryU.save(usuarioExistente));
            }).orElseGet(() -> {
                return Optional.empty();
            });
        } else {
            return Optional.empty();
        }
    }*/
}
