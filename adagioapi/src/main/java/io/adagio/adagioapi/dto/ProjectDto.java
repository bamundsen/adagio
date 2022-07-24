package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;

public class ProjectDto {

	private Long id;
	
	private String title;

	private String description;

	private LocalDateTime dateTimeStart;

	private LocalDateTime dateTimeEnd;
	
	private Long idUser;
	
	private List<Task> tasks;
	
	public ProjectDto(Project project)
	{
		this.id = project.getId();
		this.title = project.getTitle();
		this.description = project.getDescription();
		this.dateTimeEnd = project.getDateTimeEnd();
		this.dateTimeStart = project.getDateTimeStart();
		this.idUser = project.getUser().getId();
		this.tasks = project.getTasks();
	}
	
	public Long getId () {
		return this.id;
	}
	
	public Long getIdUser() {
		return this.idUser;
	}
	
	public List<Task> getTasks(){
		return this.tasks;
	}
	
	public LocalDateTime getDateTimeEnd() {
		return this.dateTimeEnd;
	}
	
	public LocalDateTime getDateTimeStart() {
		return this.dateTimeStart;
	}

	public String getTitle() {
		return this.title;
	}
	
	public String getDescription() {
		return this.description;
	}
}
