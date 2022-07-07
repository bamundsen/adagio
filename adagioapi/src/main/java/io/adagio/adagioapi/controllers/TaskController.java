package io.adagio.adagioapi.controllers;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.repositories.TaskRepository;

@RestController
@RequestMapping("${adagio.api.base_servico}/testtask")
public class TaskController {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@RequestMapping("/first")
	@Transactional()
	public String testeTask() {
		
		Task teste = new Task();
		teste.setTitle("titulo");
		teste.setPriority(Priority.LOW);
		teste.setDateTimeEnd(LocalDateTime.now());
		teste.setDateTimeStart(LocalDateTime.now());
		
		taskRepository.save(teste);
		
		return "teste";
	}

}
