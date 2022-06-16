package io.adagio.adagioapi.config.security;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.UserRepository;

public class AutenticacaoViaTokenFilter extends OncePerRequestFilter{

	private TokenService tokenService;
	private UserRepository usuarioRepository;
	public AutenticacaoViaTokenFilter(TokenService tokenService,
			UserRepository usuarioRepository) {
		this.tokenService = tokenService;
		this.usuarioRepository=usuarioRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = recuperarToken(request);
		System.out.println("TOKEN:"+token);
		boolean valido = tokenService.isTokenValid(token);
		System.out.println("TOKEN VÁLIDO: "+valido);
		if(valido) {
			autenticarCliente(token);
		}
		
		System.out.println("mas aqui chega");
		filterChain.doFilter(request, response);
	}

	private void autenticarCliente(String token) {
		Long idUsuario = tokenService.getIdUsuario(token);
		Optional<User> usuarioOpt = usuarioRepository.findById(idUsuario);
		User usuario = usuarioOpt.orElse(null);
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(usuario,
				null, usuario.getAuthorities());
		SecurityContextHolder.
		getContext().setAuthentication(authentication);
		
		System.out.println("CHEGA AQUI");
	}

	private String recuperarToken(HttpServletRequest request) {
		String token =request.getHeader("Authorization");
		
		if(token==null || token.isEmpty() || !token.startsWith("Bearer ")) {
			return null;
		}
		
		return token.replace("Bearer ","");
	}
}
