package io.adagio.adagioapi.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import io.adagio.adagioapi.config.utils.SecurityCipher;

@Component
public class CookieUtil {

    @Value("${adagio.jwt.cookie_name}")
    private String accessTokenCookieName;

    @Value("${adagio.jwt.refresh_cookie_name}")
    private String refreshTokenCookieName;
    
    public HttpCookie createAccessTokenCookie(String token, Long duration) {
//    	String  encryptedToken = SecurityCipher.encrypt(token);
    	
    	System.out.println("duração: "+ duration);
    	return ResponseCookie.from("accessToken", token)
    			.maxAge(duration / 1000)
    			.httpOnly(true)
    			.path("/")
    			.build();
    }
    
    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
//    	String  encryptedToken = SecurityCipher.encrypt(token);
    
    	System.out.println("duração: "+duration);
    	return ResponseCookie.from("refreshToken", token)
    			.maxAge(duration / 1000)
    			.httpOnly(true)
    			.path("/")
    			.build();
    }
    
    public ResponseCookie deleteAccessTokenCookie() {
    	
    	return ResponseCookie.from(accessTokenCookieName, "")
    			.maxAge(0).httpOnly(true).path("/").build();
    }
    
    public ResponseCookie deleteRefreshTokenCookie() {
    	
    	return ResponseCookie.from(refreshTokenCookieName, "")
		.maxAge(0).httpOnly(true).path("/").build();
    }
}
