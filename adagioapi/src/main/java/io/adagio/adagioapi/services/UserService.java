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
		
		Boolean accessTokenIsValid = tokenService.isTokenValid(accessToken,"accesstoken");
		Boolean refreshTokenIsValid = tokenService.isTokenValid(refreshToken,"refreshtoken");
		
		HttpHeaders responseHeaders = new HttpHeaders();
		Token newAccessToken = new Token();
		Token newRefreshToken = new Token();
		
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
			
			addAccessTokenCookie(responseHeaders, newAccessToken);
			addRefreshTokenCookie(responseHeaders, newRefreshToken);
		}
		
//		if(!refreshTokenIsValid && accessTokenIsValid) {
//			newRefreshToken = tokenService.gerarRefreshToken(login);
//			addRefreshTokenCookie(responseHeaders, newRefreshToken);
//		}
		
		
		 LoginResponse loginResponse = new LoginResponse(LoginResponse.SuccessFailure.SUCCESS,
				 "Auth successful.",user);
	     return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
	}
	
    public ResponseEntity<LoginResponse> refresh(String accessToken, String refreshToken) {
        Boolean refreshTokenValid = tokenService.isTokenValid(refreshToken,"refreshtoken");
        
        if(refreshToken.trim().length() == 0) {
        	throw new IllegalArgumentException("IGUAL A ZERO !");
        }
        
//        if(tokenService.isTokenValid(accessToken,"accesstoken")) {
//        	String currentUserLogin = tokenService.getLoginFromToken(accessToken,"accesstoken");
//        	Optional<User> currentUser = userRepository.findByLogin(currentUserLogin);
//        	
//            LoginResponse loginResponse = new LoginResponse(LoginResponse.SuccessFailure.SUCCESS, 
//            		"Refresh successful.",currentUser.get());
//            
//            return ResponseEntity.ok().body(loginResponse);
//        }
        
        if (!refreshTokenValid) {
            throw new IllegalArgumentException("Refresh Token is invalid!");
        }

        String currentUserLogin = tokenService.getLoginFromToken(refreshToken,"refreshtoken");
//        String currentUserLogin = tokenService.getLoginFromToken(accessToken,"accesstoken");
        Optional<User> currentUser = userRepository.findByLogin(currentUserLogin);
        
        Token newAccessToken = tokenService.gerarTokenDeAcesso(currentUserLogin);
        Token newRefreshToken = tokenService.gerarRefreshToken(currentUserLogin);
        
     
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil
        		.createAccessTokenCookie(newAccessToken.getTokenValue(), newAccessToken.getDuration()).toString());
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil
        		.createRefreshTokenCookie(newRefreshToken.getTokenValue(),newRefreshToken.getDuration()).toString());
     
        LoginResponse loginResponse = new LoginResponse(LoginResponse.SuccessFailure.SUCCESS, 
        		"Refresh successful.",currentUser.get());
        
        return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
    }
    
	private void addAccessTokenCookie(HttpHeaders httpHeaders, Token token ) {
		System.out.println(token.getDuration());
		httpHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(token.getTokenValue(),
				token.getDuration()).toString());
	}
	
	private void addRefreshTokenCookie(HttpHeaders httpHeaders, Token token ) {
		System.out.println(token.getDuration());
		httpHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(token.getTokenValue(),
				token.getDuration()).toString());
	}
	

	public ResponseEntity<?> logout() {
		HttpHeaders responseHeaders = new HttpHeaders();
		
		Token accessToken = new Token(null, cookieUtil.deleteAccessTokenCookie().getValue(), (long)0, null);
		Token refreshToken = new Token(null, cookieUtil.deleteRefreshTokenCookie().getValue(), (long)0, null);
		addAccessTokenCookie(responseHeaders,accessToken);
		addRefreshTokenCookie(responseHeaders, refreshToken);
		
		return ResponseEntity.ok().headers(responseHeaders).build();
	}
}








