package io.adagio.adagioapi.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import io.adagio.adagioapi.repositories.UserRepository;

public class UniqueLoginValidator implements ConstraintValidator<UniqueLogin, String> {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null) {
			return false;
		}
		
		if(userRepository.findByLogin(value).isEmpty()) {
			return true;
		}
		
		return false;
	}

}
