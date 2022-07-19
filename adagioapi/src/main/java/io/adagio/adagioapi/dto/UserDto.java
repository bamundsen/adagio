package io.adagio.adagioapi.dto;

import io.adagio.adagioapi.models.User;

public class UserDto {

	private Long id;
	private String login;
	private String email;
	private String name;
	private String phone;
	
	public UserDto(User user) {
		this.login = user.getLogin();
		this.id = user.getId();
		this.email = user.getEmail();
		this.phone = user.getPhone();
		this.name = user.getName();
	}

	public Long getId() {
		return id;
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
