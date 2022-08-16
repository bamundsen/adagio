package io.adagio.adagioapi.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<Phone, String>{

	private static final String PHONE_PATTERN = "^[0-9]{10,11}$";
	private static final Pattern pattern = Pattern.compile(PHONE_PATTERN);
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null) {
			return false;
		}
		
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
	}

	
}
