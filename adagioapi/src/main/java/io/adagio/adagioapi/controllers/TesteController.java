package io.adagio.adagioapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.adagio.adagioapi.config.security.RestAuthenticationEntryPoint;

@RestController
@RequestMapping("${adagio.api.base_servico}/teste")
public class TesteController {

	@GetMapping
	public ResponseEntity<?> teste() {
		return ResponseEntity.ok("Testando API.");
	}
}

