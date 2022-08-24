package io.adagio.adagioapi.controllers;

import java.net.URI;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.adagio.adagioapi.dto.CadastroProjetoForm;
import io.adagio.adagioapi.dto.OperationType;
import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.TitleOrAndIdProjectQueryDTO;
import io.adagio.adagioapi.models.DefaultMessages;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.repositories.UserRepository;
import io.adagio.adagioapi.services.ProjectService;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/projects")
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private ProjectService projectService;
	
	@Value("${adagio.api.base_servico_de_rotas_privadas}")
	private String base_da_url_do_servico;
	

	@GetMapping
	public Page<ProjectDto> list(@PageableDefault(sort="dateTimeEnd",page=0,size=10,
			direction=Direction.ASC) Pageable pagination){
			User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
			Page<Project> projects = projectRepository.findByUser(logged,pagination);
			return Project.convert(projects);	
	}
	
	@PostMapping("/list-by-title")
	public Page<ProjectDto> listByTitle(@PageableDefault(sort="title",page=0, size=10,
			direction=Direction.DESC) Pageable pagination,@RequestBody @Valid TitleOrAndIdProjectQueryDTO queryDto){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Page<Project> projects = projectRepository.findByTitleAndUser_IdNative(queryDto.getTitle(), logged.getId(), pagination);
		
		return Project.convert(projects);
	}
	
	@GetMapping("/{id}/tasks")
	public ResponseEntity<Page<TaskDto>> getTasksByProject(@PageableDefault(sort="dateTimeEnd", page=0, size=10,
			direction=Direction.ASC) Pageable pagination, @PathVariable("id") Long id){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Optional<Project> project = projectRepository.findByIdAndUser(id,logged);
		
		if(project.isPresent()) {
			Page<Task> tasks = taskRepository.findByProjectAndUser(project.get(), logged, pagination);
			
			return ResponseEntity.ok().body(Task.convert(tasks));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProjectDto> detail(@PathVariable("id") Long id){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				
		Optional<Project> project = projectRepository.findByIdAndUser(id,logado);
		
		if(project.isPresent()) {
			return ResponseEntity.ok(new ProjectDto(project.get()));
		}
		
		return ResponseEntity.notFound().build();
	}
	 
	@PostMapping
	@Transactional
	public ResponseEntity<ProjectDto> register(@RequestBody @Valid CadastroProjetoForm projectForm, 
			UriComponentsBuilder uriBuilder){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Project project = projectForm.converter( taskRepository,logged);

		if(project.getId() == null) {
			
			if(projectService.tasksAreWithinTimeOfProject(project, project.getTasks()) && projectService.finalIsGreaterThanInitialDate(project)) {
				projectRepository.save(project);
				
				projectService.vinculateTasksToProject(project.getTasks(),project,logged);
				
				URI uri = uriBuilder.path(base_da_url_do_servico+"/projects/{id}")
						.buildAndExpand(project.getId()).toUri();
				
				
				return ResponseEntity.created(uri).body(new ProjectDto(project));
			} else {
				
				if( !projectService.finalIsGreaterThanInitialDate(project)) {
					return ResponseEntity
							.badRequest()
							.body(new 
							ProjectDto(project,
							DefaultMessages.PROJECT_WRONG_DATE_TIMES.getMessage()));
				} else {
					return ResponseEntity
							.badRequest()
							.body(new 
							ProjectDto(project,
							DefaultMessages.WRONG_TASKS_VINCULATED_TO_PROJECT.getMessage()));
				}
			
			}

		}

		return ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<ProjectDto> update(@PathVariable("id") Long id, @RequestBody @Valid CadastroProjetoForm projectForm){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
		Optional<Project> optionalProject = projectRepository.findByIdAndUser(id,logged);
		
		if(optionalProject.isPresent()) {
			
			Project projectDtoAux = projectForm.converter( taskRepository,logged);
			
			if(projectService.tasksAreWithinTimeOfProject( projectDtoAux, projectDtoAux.getTasks()) && projectService.finalIsGreaterThanInitialDate( projectDtoAux)) {
			
				projectService.deleteTasksByProjectOrDesvinculateAndUser(optionalProject.get(), logged, OperationType.EDIT);
				
				Project project = projectForm.atualizar(id, projectRepository,taskRepository);
				
				projectService.vinculateTasksToProject(project.getTasks(),project,logged);
				
				projectRepository.save(project);
				
				return ResponseEntity.ok(new ProjectDto(project));
				
			}  else {
				
				if( !projectService.finalIsGreaterThanInitialDate(optionalProject.get())) {
					return ResponseEntity
							.badRequest()
							.body(new 
							ProjectDto(optionalProject.get(),
									DefaultMessages.PROJECT_WRONG_DATE_TIMES.getMessage()));
				} else {
					return ResponseEntity
							.badRequest()
							.body(new 
							ProjectDto(optionalProject.get(),
									DefaultMessages.WRONG_TASKS_VINCULATED_TO_PROJECT.getMessage()));
				}
			
			}
		
		}
	
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> delete(@PathVariable("id") Long id){
		User logged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Optional<Project> project = projectRepository.findByIdAndUser(id,logged);
		
		if(project.isPresent()) {
			projectService.deleteTasksByProjectOrDesvinculateAndUser(project.get(), logged, OperationType.DELETE);
			projectRepository.deleteByIdAndUser(id,logged);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}
}
