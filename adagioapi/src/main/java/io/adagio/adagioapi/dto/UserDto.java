package io.adagio.adagioapi.dto;

import io.adagio.adagioapi.models.User;

public class UserDto {

	private String login;
	private String email;
	private String name;
	
	public UserDto(User user) {
		this.login = user.getLogin();
		this.email = user.getEmail();
		this.name = user.getName();
	}

	public String getLogin() {
		return login;
	}

	public String getEmail() {
		return email;
	}

	public String getName() {
		return name;
	}
	
	
}
