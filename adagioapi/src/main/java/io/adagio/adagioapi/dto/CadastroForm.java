package io.adagio.adagioapi.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import io.adagio.adagioapi.models.User;

public class CadastroForm {

	@NotNull @NotEmpty
	private String login;
	
	@Email @NotNull
	private String email;
	
	@NotNull @Size(min=8)
	private String password;
	
	@NotNull
	private String phone;
	
	@NotNull
	private String name;
	
	@NotNull
	private String cpf;

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
