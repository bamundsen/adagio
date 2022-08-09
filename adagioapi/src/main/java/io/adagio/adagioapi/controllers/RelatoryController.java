package io.adagio.adagioapi.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.adagio.adagioapi.dto.RelatoryQueryDto;
import io.adagio.adagioapi.dto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.services.RelatoryService;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/relatory")
public class RelatoryController {

	@Autowired
	private RelatoryService relatoryService;
	
	@PostMapping("/get-by-month")
	public ResponseEntity<ReturnedRelatoryTaskSetData> getByMonth(@RequestBody @Valid RelatoryQueryDto dto){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ReturnedRelatoryTaskSetData tasksRelatory = relatoryService.getByMonth(logged,dto.getMonth(),dto.getYear());
		
		return ResponseEntity.ok().body(tasksRelatory);
	}
}
