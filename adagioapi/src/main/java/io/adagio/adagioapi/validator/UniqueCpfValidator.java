package io.adagio.adagioapi.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import io.adagio.adagioapi.repositories.UserRepository;

public class UniqueCpfValidator implements ConstraintValidator<UniqueCpf, String> {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null) {
			return false;
		}
		
		if(userRepository.findByCpf(value).isEmpty()) {
			return true;
		}
		return false;
	}

	
}
