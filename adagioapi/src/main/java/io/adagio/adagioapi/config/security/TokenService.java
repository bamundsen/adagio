package io.adagio.adagioapi.config.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

	@Value("${adagio.jwt.expiration}")
	private String expiration;
	
	@Value("${adagio.jwt.secret}")
	private String secret;
	
	public String gerarToken(Authentication authentication) {
		User logado =(User) authentication.getPrincipal();
		Date hoje= new Date();
		Date dataExpiracao=new Date(hoje.getTime()+Long.parseLong(expiration));
		System.out.println("data expiração: "+dataExpiracao);
		return Jwts.builder()
				.setIssuer("API do Adagio")
				.setSubject(logado.getId().toString())
				.setIssuedAt(hoje)
				.setExpiration(dataExpiracao)
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();
	}

	public boolean isTokenValid(String token) {
		try {
			Jwts.parser().setSigningKey(this.secret)
			.parseClaimsJws(token);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	public Long getIdUsuario(String token) {
		Claims claims = Jwts.parser().setSigningKey(this.secret)
		.parseClaimsJws(token).getBody();
		return Long.parseLong(claims.getSubject());
	}
}
