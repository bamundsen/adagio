package io.adagio.adagioapi.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.validator.CPF;
import io.adagio.adagioapi.validator.Password;
import io.adagio.adagioapi.validator.Phone;
import io.adagio.adagioapi.validator.UniqueCpf;
import io.adagio.adagioapi.validator.UniqueEmail;
import io.adagio.adagioapi.validator.UniqueLogin;

public class RegisterForm {

	@NotNull @NotEmpty @Size(min=8, max=30) @UniqueLogin
	private String login;
	
	@Email @NotNull @UniqueEmail
	private String email;
	
	@NotNull @Size(min=8, max=30) @Password
	private String password;
	
	@NotNull @NotEmpty @Phone
	private String phone;
	
	@NotNull @NotEmpty
	private String name;
	
	@NotNull @NotEmpty @CPF @UniqueCpf
	private String cpf;
	
	/*
	private boolean notUniqueError = false;
	private String loginNotUniqueError,
		emailNotUniqueError,
		cpfNotUniqueError; */
	

	public String getLogin() {
		return login;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getPhone() {
		return phone;
	}

	public String getName() {
		return name;
	}

	public String getCpf() {
		return cpf;
	}
	
	public User converter() {
		password = new BCryptPasswordEncoder().encode(password);
		return new User(this);
	}
}
