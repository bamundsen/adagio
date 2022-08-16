package io.adagio.adagioapi.validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = CPFValidator.class)
public @interface CPF {
	String message() default "{user.CPF.format}";
	
	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };

}
