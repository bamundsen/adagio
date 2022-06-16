package io.adagio.adagioapi.dto;

public class AccessData {

	private String token;
	private String tipo;
	private UserDto user;
	
	public AccessData(TokenDto tokenDto, String tipo, UserDto user) {
		this.token = tokenDto.getToken();
		this.tipo = tipo;
		this.user = user;
	}
	
	public String getTipo() {
		return tipo;
	}
	
	public UserDto getUser() {
		return user;
	}
	
	public String getToken() {
		return token;
	}
}
