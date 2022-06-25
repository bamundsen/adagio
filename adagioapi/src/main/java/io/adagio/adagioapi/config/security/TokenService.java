package io.adagio.adagioapi.config.security;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.Token;
import io.adagio.adagioapi.dto.UserDto;
import io.adagio.adagioapi.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

	@Value("${adagio.jwt.expiration}")
	private String expiration;
	
	@Value("${adagio.jwt.refresh_expiration}")
	private String refresh_expiration;
	
	@Value("${adagio.jwt.secret}")
	private String secret;
	
	public Token gerarTokenDeAcesso(String login) {
		Date hoje= new Date();
		long duracao = hoje.getTime()+Long.parseLong(expiration);
		Date dataExpiracao=new Date(duracao);
		System.out.println("data expiração access: "+dataExpiracao);
		String token = Jwts.builder()
				.setIssuer("API do Adagio")
				.setSubject(login)
				.setIssuedAt(hoje)
				.setExpiration(dataExpiracao)
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		
		System.out.println("|EITA,  O VALOR"+duracao);
		return new Token(Token.TokenType.ACCESS,token,Long.parseLong(expiration),LocalDateTime.ofInstant(dataExpiracao.toInstant(),
				ZoneId.systemDefault()));
	}
	
	public Token gerarRefreshToken(String login) {
		Date hoje= new Date();
		System.out.println(refresh_expiration);
		long duracao = hoje.getTime()+Long.parseLong(refresh_expiration);
		Date dataExpiracao=new Date(duracao);
		System.out.println("data expiração: "+dataExpiracao);
		String token = Jwts.builder()
				.setIssuer("API do Adagio")
				.setSubject(login)
				.setIssuedAt(hoje)
				.setExpiration(dataExpiracao)
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		System.out.println(LocalDateTime.ofInstant(dataExpiracao.toInstant(),
				ZoneId.systemDefault()));
		
		System.out.println("|EITA,  O VALOR"+duracao);
		return new Token(Token.TokenType.REFRESH,token,Long.parseLong(refresh_expiration),LocalDateTime.ofInstant(dataExpiracao.toInstant(),
				ZoneId.systemDefault()));
	}

	public boolean isTokenValid(String token) {
		try {
			Jwts.parser().setSigningKey(this.secret)
			.parseClaimsJws(token);
			return true;
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}

	public String getLoginFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(this.secret)
		.parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}
