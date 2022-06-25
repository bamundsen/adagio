package io.adagio.adagioapi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.config.security.TokenService;
import io.adagio.adagioapi.dto.LoginForm;
import io.adagio.adagioapi.dto.LoginResponse;
import io.adagio.adagioapi.dto.Token;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.UserRepository;
import io.adagio.adagioapi.utils.CookieUtil;

@Service
public class UserService  {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private CookieUtil cookieUtil;
	
	public ResponseEntity<LoginResponse> login(LoginForm loginForm, 
			String accessToken,
			String refreshToken){
		String login = loginForm.getLogin();
		User user = userRepository.findByLogin(login).orElseThrow(()->new IllegalArgumentException(
				"Usuário com login "+login+" não encontrado."));
		
		Boolean accessTokenIsValid = tokenService.isTokenValid(accessToken);
		Boolean refreshTokenIsValid = tokenService.isTokenValid(refreshToken);
		
		System.out.println("CHEGA AQUI");
		HttpHeaders responseHeaders = new HttpHeaders();
		Token newAccessToken = new Token();
		Token newRefreshToken;
		
		if(!accessTokenIsValid && !refreshTokenIsValid) {
			newAccessToken = tokenService.gerarTokenDeAcesso(user.getLogin());
			newRefreshToken = tokenService.gerarRefreshToken(user.getLogin());
			
			addAccessTokenCookie(responseHeaders,newAccessToken);
			addRefreshTokenCookie(responseHeaders, newRefreshToken);
		}
		
		if(!accessTokenIsValid && refreshTokenIsValid) {
			newAccessToken = tokenService.gerarTokenDeAcesso(login);
			addAccessTokenCookie(responseHeaders, newAccessToken);
		}
		
		if(accessTokenIsValid && refreshTokenIsValid) {
			newAccessToken = tokenService.gerarTokenDeAcesso(login);
			newRefreshToken = tokenService.gerarRefreshToken(login);
			
			addAccessTokenCookie(responseHeaders, newRefreshToken);
			addRefreshTokenCookie(responseHeaders, newRefreshToken);
		}
		
		 LoginResponse loginResponse = new LoginResponse(LoginResponse.SuccessFailure.SUCCESS,
				 "Auth successful.",user,newAccessToken.getTokenValue());
	     return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
	}
	
    public ResponseEntity<LoginResponse> refresh(String accessToken, String refreshToken) {
        Boolean refreshTokenValid = tokenService.isTokenValid(refreshToken);
        if (!refreshTokenValid) {
            throw new IllegalArgumentException("Refresh Token is invalid!");
        }

        String currentUserLogin = tokenService.getLoginFromToken(accessToken);
        Optional<User> currentUser = userRepository.findByLogin(currentUserLogin);
        
        Token newAccessToken = tokenService.gerarTokenDeAcesso(currentUserLogin);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(newAccessToken.getTokenValue(), newAccessToken.getDuration()).toString());

        LoginResponse loginResponse = new LoginResponse(LoginResponse.SuccessFailure.SUCCESS, 
        		"Auth successful.",currentUser.get(), newAccessToken.getTokenValue());
        
        return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
    }
    
	private void addAccessTokenCookie(HttpHeaders httpHeaders, Token token ) {
		httpHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(token.getTokenValue(),
				token.getDuration()).toString());
	}
	
	private void addRefreshTokenCookie(HttpHeaders httpHeaders, Token token ) {
		httpHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(token.getTokenValue(),
				token.getDuration()).toString());
	}
	

	public ResponseEntity<?> logout() {
		HttpHeaders responseHeaders = new HttpHeaders();
		
		Token token = new Token(null, cookieUtil.deleteAccessTokenCookie().getValue(), (long)0, null);
		addAccessTokenCookie(responseHeaders,token);
		
		return ResponseEntity.ok().headers(responseHeaders).build();
	}
}








