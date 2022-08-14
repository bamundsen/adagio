package io.adagio.adagioapi.controllers;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.adagio.adagioapi.dto.FreeDayTimeDTO;
import io.adagio.adagioapi.dto.QuantityOfTasksAuxDto;
import io.adagio.adagioapi.dto.TodayTaskToBeAlertedDto;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.services.AuxInformationService;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/aux-information")
public class AuxInformationController {

	@Autowired
	private AuxInformationService auxInformationService;
	
	@GetMapping("/get-quantity-of-tasks-of-today")
	public ResponseEntity<QuantityOfTasksAuxDto> getQuantityOfTasksOfToday() {
		
		User logged  = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
		return auxInformationService.getQuantityOfTasksFromToday(logged);
	}
	

	@GetMapping("/get-today-tasks-to-be-alerted")
	public ResponseEntity<List<TodayTaskToBeAlertedDto>> getTodayTasksToBeAlerted(){
		
		User loggd = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		return auxInformationService.getTodayTasksToBeAlerted(loggd);

	}
	
	@PostMapping("/get-free-day-time")
	public ResponseEntity<FreeDayTimeDTO> getFreeDayTime(@RequestBody @Valid FreeDayTimeDTO freeDayTimeDto){
		User logged  = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return auxInformationService.getFreeDayTime(logged, freeDayTimeDto.getLocalDateTime().toLocalDate());

	}
}

