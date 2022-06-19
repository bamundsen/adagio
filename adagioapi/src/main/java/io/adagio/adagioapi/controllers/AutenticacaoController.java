package io.adagio.adagioapi.controllers;

import org.springframework.security.core.Authentication;

import java.net.URI;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;

import io.adagio.adagioapi.config.security.TokenService;
import io.adagio.adagioapi.dto.AccessData;
import io.adagio.adagioapi.dto.CadastroForm;
import io.adagio.adagioapi.dto.LoginForm;
import io.adagio.adagioapi.dto.ResponseFeedbackMessage;
import io.adagio.adagioapi.dto.TokenDto;
import io.adagio.adagioapi.dto.UserDto;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.UserRepository;

@RestController
@RequestMapping("${adagio.api.base_servico}/auth")
public class AutenticacaoController {

	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Value("${adagio.api.base_servico}")
	private String base_da_url_do_servico;
	
	
	@PostMapping("/login")
	public ResponseEntity<AccessData> autenticar(@RequestBody @Valid
			LoginForm form){
		UsernamePasswordAuthenticationToken dadosLogin=form.converter();
		System.out.println("BATEU AQUI");
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
	
	@PostMapping("/register")
	@Transactional()
	public ResponseEntity<ResponseFeedbackMessage> cadastrar(@RequestBody @Valid CadastroForm cadastroForm,
			UriComponentsBuilder uriBuilder){
		
		try {
			User user = cadastroForm.converter();
			userRepository.save(user);
			
			URI uri = uriBuilder.path(base_da_url_do_servico+"/register/{id}")
					.buildAndExpand(user.getId()).toUri();
			
			return ResponseEntity.created(uri).body(new ResponseFeedbackMessage("Usuário criado",200));
		
		}catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
}
