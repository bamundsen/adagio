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
import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.repositories.UserRepository;

@RestController
@RequestMapping("${adagio.api.base_servico_de_rotas_privadas}/projects")
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	

	@Value("${adagio.api.base_servico_de_rotas_privadas}")
	private String base_da_url_do_servico;
	

	@GetMapping
	public Page<ProjectDto> listar(@PageableDefault(sort="dateTimeEnd",page=0,size=10,
			direction=Direction.DESC) Pageable paginacao){
			User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
			Page<Project> projects = projectRepository.findByUser(logado,paginacao);
			return Project.converter(projects);	
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProjectDto> detalhar(@PathVariable("id") Long id){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				
		Optional<Project> project = projectRepository.findByIdAndUser(id,logado);
		
		if(project.isPresent()) {
			return ResponseEntity.ok(new ProjectDto(project.get()));
		}
		
		return ResponseEntity.notFound().build();
	}
	 
	@PostMapping
	@Transactional
	public ResponseEntity<ProjectDto> cadastrar(@RequestBody @Valid CadastroProjetoForm projectForm, 
			UriComponentsBuilder uriBuilder){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Project project = projectForm.converter( taskRepository,logado);
		
		projectRepository.save(project);
		
		URI uri = uriBuilder.path(base_da_url_do_servico+"/projects/{id}")
				.buildAndExpand(project.getId()).toUri();
		
		
		return ResponseEntity.created(uri).body(new ProjectDto(project));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<ProjectDto> atualizar(@PathVariable("id") Long id, @RequestBody @Valid CadastroProjetoForm projectForm){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Optional<Project> optionalProject = projectRepository.findByIdAndUser(id,logado);
		
		if(optionalProject.isPresent()) {
			Project project = projectForm.atualizar(id, projectRepository,taskRepository);
			return ResponseEntity.ok(new ProjectDto(project));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> deletar(@PathVariable("id") Long id){
		User logado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Optional<Project> project = projectRepository.findByIdAndUser(id,logado);
		
		if(project.isPresent()) {
			projectRepository.deleteByIdAndUser(id,logado);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}
}
