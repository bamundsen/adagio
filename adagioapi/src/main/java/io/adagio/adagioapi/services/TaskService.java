package io.adagio.adagioapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	
	public ResponseEntity<TaskDto> recuperarTarefa() {
		
		return null;
	}
	
	
	

}
