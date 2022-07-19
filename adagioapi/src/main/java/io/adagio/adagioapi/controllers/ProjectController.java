package io.adagio.adagioapi.controllers;

import java.net.URI;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.adagio.adagioapi.dto.CadastroProjetoForm;
import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.models.Project;
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
	
	@Autowired
	private UserRepository userRepository;
	
	@Value("${adagio.api.base_servico_de_rotas_privadas}")
	private String base_da_url_do_servico;
	
	@GetMapping
	public Page<ProjectDto> listar(@PageableDefault(sort="dateTimeEnd",page=0,size=10,
			direction=Direction.ASC) Pageable paginacao){
	
			Page<Project> projects = projectRepository.findAll(paginacao);
			return Project.converter(projects);	
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<ProjectDto> cadastrar(@RequestBody @Valid CadastroProjetoForm projectForm, 
			UriComponentsBuilder uriBuilder){
		
		Project project = projectForm.converter(userRepository, taskRepository);
		
		projectRepository.save(project);
		
		URI uri = uriBuilder.path(base_da_url_do_servico+"/projects/{id}")
				.buildAndExpand(project.getId()).toUri();
		
		
		return ResponseEntity.created(uri).body(new ProjectDto(project));
	}
}
