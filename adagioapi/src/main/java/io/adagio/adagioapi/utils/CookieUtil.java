package io.adagio.adagioapi.utils;

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
    	String  encryptedToken = SecurityCipher.encrypt(token);
    	
    	return ResponseCookie.from(accessTokenCookieName, encryptedToken)
    			.maxAge(duration)
    			.httpOnly(true)
    			.path("/")
    			.build();
    }
    
    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
    	String  encryptedToken = SecurityCipher.encrypt(token);
    	
    	return ResponseCookie.from(refreshTokenCookieName, encryptedToken)
    			.maxAge(duration)
    			.httpOnly(true)
    			.path("/")
    			.build();
    }
    
    public HttpCookie deleteAccessTokenCookie() {
    	return ResponseCookie.from(accessTokenCookieName, "").maxAge(0).httpOnly(true).path("/").build();
    }
}
