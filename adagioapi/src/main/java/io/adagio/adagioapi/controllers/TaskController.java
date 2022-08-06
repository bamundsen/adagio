package io.adagio.adagioapi.controllers;


import java.net.URI;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.adagio.adagioapi.dto.CadastroTarefaForm;
import io.adagio.adagioapi.dto.StartAndEndDateDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.TaskQueryDTO;
import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.NotificationRepository;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.services.TaskService;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/tasks")
public class TaskController {
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Value("${adagio.api.base_servico_de_rotas_privadas}")
	private String base_da_url_do_servico;
	
	@GetMapping
	public Page<TaskDto> list(@PageableDefault(sort="dateTimeEnd",page=0,size=10,
			direction=Direction.ASC) Pageable pagination){
			Page<Task> tasks = taskRepository.findAll(pagination);
			
			return Task.converter(tasks);	
	}

	@PostMapping("/list-by-start-datetime-filter")
	public ResponseEntity<List<TaskDto>> listByStartDateAndEndDate(@RequestBody @Valid StartAndEndDateDto startDateDto){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThan(logado,
				startDateDto.getDateTimeStart(),
				startDateDto.getDateTimeEnd());
		
		List<TaskDto> tasksDto = Task.converter(tasks);
		
		return ResponseEntity.ok().body(tasksDto);
	}
	
	
	@PostMapping
	@Transactional
	public ResponseEntity<TaskDto> save(@RequestBody @Valid CadastroTarefaForm taskForm, 
			UriComponentsBuilder uriBuilder){
		
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Task task = taskForm.converter(logado, projectRepository);

		taskRepository.save(task);
		
		 if (taskForm.getNotifications() != null) {
			 for (Notification n : task.getNotifications()) {
				Notification notification = new Notification(n, task);
				notificationRepository.save(notification);
			 }
		}
		
		URI uri = uriBuilder.path(base_da_url_do_servico+"/task/{id}")
				.buildAndExpand(task.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new TaskDto(task));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<TaskDto> delete(@PathVariable ("id") Long id){
		
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Optional<Task> task = taskRepository.findByIdAndUser(id, logado);
		
		if (task.isPresent()) {

			taskRepository.deleteByIdAndUser(id, logado);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/list-by-title-filter")
	public ResponseEntity<Page<TaskDto>> listByTitle(@PageableDefault(sort="title",page=0,size=10,
			direction=Direction.DESC) Pageable pageable, @RequestBody @Valid TaskQueryDTO taskQueryDto){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Page<Task> tasks = taskRepository.findByTitleAndUser_IdNative(taskQueryDto.getTitle(), logado.getId(), pageable);
		
		Page<TaskDto> tasksDto = Task.converter(tasks);
		
		return ResponseEntity.ok().body(tasksDto);
	}
	
	@PostMapping("/list-by-project-filter")
	public ResponseEntity<Page<TaskDto>> listByProjectId(@PageableDefault(sort="dateTimeEnd",page=0,size=10,
			direction=Direction.DESC) Pageable pageable, @RequestBody @Valid TaskQueryDTO taskQueryDto){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Page<Task> tasks = taskRepository.findByProject_IdAndUser(taskQueryDto.getProjectId(), logado, pageable);
		
		Page<TaskDto> tasksDto = Task.converter(tasks);
		
		return ResponseEntity.ok().body(tasksDto);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TaskDto> preUpdate(@PathVariable ("id") Long id){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Optional<Task> task = taskRepository.findByIdAndUser(id, logado);
		
		TaskDto taskDto = new TaskDto(task.get());
				
		return ResponseEntity.ok().body(taskDto);
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<TaskDto> update(@PathVariable("id") Long id, @RequestBody @Valid CadastroTarefaForm taskForm){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Optional<Task> optionalTask = taskRepository.findByIdAndUser(id, logado);
		
		if(optionalTask.isPresent()) {
			Task task = taskForm.update(id, taskRepository, projectRepository);
			
			if (optionalTask.get().getNotifications() != null)
				notificationRepository.deleteByTask(optionalTask.get());
				
			if (taskForm.getNotifications() != null ) {
				 for (Notification n : taskForm.getNotifications()) {
					Notification notification = new Notification(n, optionalTask.get());
					notificationRepository.save(notification);
				 }
			}
			
			return ResponseEntity.ok(new TaskDto(task));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/list-by-no-project")
	public ResponseEntity<Page<TaskDto>> listByTitleNoProject(@PageableDefault(sort="title",page=0,size=10,
			direction=Direction.DESC) Pageable pageable, @RequestBody @Valid TaskQueryDTO taskQueryDto){
		
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Page<Task> tasks = taskRepository.findByTitleAndNoProjectaAndUser_IdNative(taskQueryDto.getTitle(), logado.getId(), pageable);
		
		Page<TaskDto> tasksDto = Task.converter(tasks);
		
		return ResponseEntity.ok().body(tasksDto);
	}
}
