package io.adagio.adagioapi.validator;

import java.util.InputMismatchException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CPFValidator implements ConstraintValidator<CPF, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value.equals("00000000000") || value.equals("11111111111") || value.equals("22222222222")
				|| value.equals("33333333333") || value.equals("44444444444") || value.equals("55555555555")
				|| value.equals("66666666666") || value.equals("77777777777") || value.equals("88888888888")
				|| value.equals("99999999999") || (value.length() != 11)) {
			return false;
		}
		char dig10, dig11;
		int sm, i, r, num, weight;

		try {
			sm = 0;
			weight = 10;

			for (i = 0; i < 9; i++) {
				num = (int) (value.charAt(i) - 48);
				sm = sm + (num * weight);
				weight = weight - 1;
			}

			r = 11 - (sm % 11);
			if ((r == 10) || (r == 11))
				dig10 = '0';
			else
				dig10 = (char) (r + 48);

			sm = 0;
			weight = 11;
			for (i = 0; i < 10; i++) {
				num = (int) (value.charAt(i) - 48);
				sm = sm + (num * weight);
				weight = weight - 1;
			}

			r = 11 - (sm % 11);
			if ((r == 10) || (r == 11)) {
				dig11 = '0';
			} else {
				dig11 = (char) (r + 48);
			}

			if ((dig10 == value.charAt(9)) && (dig11 == value.charAt(10))) {
				return true;
			} else {
				return false;
			}
		} catch (InputMismatchException error) {
			return false;
		}
	}

}
