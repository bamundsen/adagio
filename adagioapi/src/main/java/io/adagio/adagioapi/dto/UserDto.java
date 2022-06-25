package io.adagio.adagioapi.dto;

import io.adagio.adagioapi.models.User;

public class UserDto {

	private String login;
	private String email;
	private String name;
	private String phone;
	
	public UserDto(User user) {
		this.login = user.getLogin();
		this.email = user.getEmail();
		this.phone = user.getPhone();
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
	
	public String getPhone() {
		return phone;
	}
}
