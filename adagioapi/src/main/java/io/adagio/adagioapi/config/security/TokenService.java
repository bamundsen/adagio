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
	
	@Value("${adagio.jwt.access_secret}")
	private String accessSecret;
	
	@Value("${adagio.jwt.refresh_secret}")
	private String refreshSecret;
	
	public Token gerarTokenDeAcesso(String login) {
		Date hoje= new Date();
		long duracao = hoje.getTime()+Long.parseLong(expiration);
		Date dataExpiracao=new Date(duracao);
	
		String token = Jwts.builder()
				.setIssuer("API do Adagio")
				.setSubject(login)
				.setIssuedAt(hoje)
				.setExpiration(dataExpiracao)
				.signWith(SignatureAlgorithm.HS512, accessSecret)
				.compact();
		
		return new Token(Token.TokenType.ACCESS,token,Long.parseLong(expiration),LocalDateTime.ofInstant(dataExpiracao.toInstant(),
				ZoneId.systemDefault()));
	}
	
	public Token gerarRefreshToken(String login) {
		Date hoje= new Date();
		
		long duracao = hoje.getTime()+Long.parseLong(refresh_expiration);
		Date dataExpiracao=new Date(duracao);
		
		String token = Jwts.builder()
				.setIssuer("API do Adagio")
				.setSubject(login)
				.setIssuedAt(hoje)
				.setExpiration(dataExpiracao)
				.signWith(SignatureAlgorithm.HS512, refreshSecret)
				.compact();
		
		return new Token(Token.TokenType.REFRESH,token,Long.parseLong(refresh_expiration),LocalDateTime.ofInstant(dataExpiracao.toInstant(),
				ZoneId.systemDefault()));
	}

	public boolean isTokenValid(String token,String type) {
		try {
			String secret = "";
			if(type.trim().toLowerCase() == "accesstoken") {
				secret = accessSecret;
			} else if (type.trim().toLowerCase() == "refreshtoken") {
				secret = refreshSecret;
			}
			Jwts.parser().setSigningKey(secret)
			.parseClaimsJws(token);
			return true;
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}

	public String getLoginFromToken(String token,String type) {
		String secret = "";
		if(type.trim().toLowerCase() == "accesstoken") {
			secret = accessSecret;
		} else if (type.trim().toLowerCase() == "refreshtoken") {
			secret = refreshSecret;
		}
		Claims claims = Jwts.parser().setSigningKey(secret)
		.parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}
