package io.adagio.adagioapi.controllers;

import org.springframework.security.core.Authentication;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;

import io.adagio.adagioapi.config.security.TokenService;
import io.adagio.adagioapi.dto.AccessData;
import io.adagio.adagioapi.dto.LoginForm;
import io.adagio.adagioapi.dto.TokenDto;
import io.adagio.adagioapi.dto.UserDto;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.UserRepository;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/login")
	public ResponseEntity<AccessData> autenticar(@RequestBody @Valid
			LoginForm form){
		UsernamePasswordAuthenticationToken dadosLogin=form.converter();
		
		try {
			
			Authentication authentication=authManager.authenticate(dadosLogin);
			String token = tokenService.gerarToken(authentication);
			
			TokenDto tokenDto = new TokenDto();
			tokenDto.setToken(token);
			
			UserDto user = new UserDto(userRepository.findByLogin(form.getLogin()).get());
			
			return ResponseEntity.ok(new AccessData(tokenDto ,
					"Bearer", user));
		}catch(AuthenticationException e) {
			
			return ResponseEntity.badRequest().build();
		}

	}
	
	@PostMapping("/validate")
	public ResponseEntity<AccessData> validate(@RequestBody @Valid TokenDto token){
		System.out.println("token: "+token);
		if(tokenService.isTokenValid(token.getToken())) {
			Long idUser = tokenService.getIdUsuario(token.getToken());
			
			User pureUser = userRepository.findById(idUser).get();
			
			UserDto userDto = new UserDto(pureUser);
			TokenDto tokenDto = new TokenDto();
			tokenDto.setToken(token.getToken());
			
			
			return ResponseEntity.ok(new AccessData(tokenDto ,
					"Bearer", userDto));
		}else{
			
			return ResponseEntity.badRequest().build();
		}
	}
}
