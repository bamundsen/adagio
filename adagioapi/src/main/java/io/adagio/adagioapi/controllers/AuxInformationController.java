package io.adagio.adagioapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.adagio.adagioapi.config.security.RestAuthenticationEntryPoint;
import io.adagio.adagioapi.dto.QuantityOfTasksAuxDto;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.services.AuxInformationService;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/aux-information")
public class AuxInformationController {

	@Autowired
	private AuxInformationService auxInformationService;
	
	@GetMapping("/get-quantity-of-tasks-of-today")
	public ResponseEntity<QuantityOfTasksAuxDto> getQuantityOfTasksOfToday() {
		
		System.out.println("antes");
		User logged  = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println("depois");
		return auxInformationService.getQuantityOfTasksFromToday(logged);
	}
}

