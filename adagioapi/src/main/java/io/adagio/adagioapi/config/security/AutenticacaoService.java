package io.adagio.adagioapi.config.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.UserRepository;

@Service
public class AutenticacaoService implements UserDetailsService{

	@Autowired
	private UserRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		Optional<User> usuario = repository.findByLogin(login);
		
		if(usuario.isPresent()) {
			return usuario.get();
		}
		
	
		throw new UsernameNotFoundException("Dados inválidos");
	}

}
