package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

public class Token {
    private TokenType tokenType;
    private String tokenValue;
    private Long duration;
    private LocalDateTime expiryDate;

    public Token() {}
    
    public Token(TokenType tokenType, String tokenValue, Long duration, LocalDateTime expiryDate) {
    	this.tokenType=tokenType;
    	this.tokenValue=tokenValue;
    	this.duration = duration;
    	this.expiryDate = expiryDate;
    }
    public enum TokenType {
        ACCESS, REFRESH
    }
	public TokenType getTokenType() {
		return tokenType;
	}
	public String getTokenValue() {
		return tokenValue;
	}
	public Long getDuration() {
		return duration;
	}
	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}
    
    
}