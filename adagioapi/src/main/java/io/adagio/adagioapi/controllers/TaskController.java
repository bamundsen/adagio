package io.adagio.adagioapi.controllers;


import java.net.URI;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.adagio.adagioapi.dto.CadastroTarefaForm;
import io.adagio.adagioapi.dto.ColorThatIsToBeShowedBasedOnPriorityDto;
import io.adagio.adagioapi.dto.StartAndEndDateDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.models.ColorOfPriority;
import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.repositories.UserRepository;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/tasks")
public class TaskController {
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Value("${adagio.api.base_servico_de_rotas_privadas}")
	private String base_da_url_do_servico;
	
	@GetMapping
	public Page<TaskDto> list(@PageableDefault(sort="dateTimeEnd",page=0,size=10,
			direction=Direction.ASC) Pageable pagination){
			User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			
			Page<Task> tasks = taskRepository.findByUser(logado,pagination);
			return Task.converter(tasks);	
	}

	
	@PostMapping("/list-by-start-datetime-filter")
	public ResponseEntity<List<TaskDto>> listByStartDateAndEndDate(@RequestBody @Valid StartAndEndDateDto startDateDto){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanAndProjectIsNull(logado,
				startDateDto.getDateTimeStart(),
				startDateDto.getDateTimeEnd());
		
		List<TaskDto> tasksDto = Task.converter(tasks);
		
		return ResponseEntity.ok().body(tasksDto);
	}
	
	@PostMapping("/get-color-that-is-to-be-showed")
	public ResponseEntity<ColorThatIsToBeShowedBasedOnPriorityDto> getColor(@RequestBody @Valid StartAndEndDateDto form){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanAndProjectIsNull(logado,
				form.getDateTimeStart(),
				form.getDateTimeEnd());
		

		ColorOfPriority hexadecimalOfColor = ColorThatIsToBeShowedBasedOnPriorityDto.defineColorThatIsToBeShowed(tasks);
		
		
		ColorThatIsToBeShowedBasedOnPriorityDto color = new ColorThatIsToBeShowedBasedOnPriorityDto(hexadecimalOfColor);
		return ResponseEntity.ok().body(color);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<TaskDto> save(@RequestBody @Valid CadastroTarefaForm taskForm, 
			UriComponentsBuilder uriBuilder){
		
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Task task = taskForm.converter(logado, projectRepository);
		
		taskRepository.save(task);
		
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
}
