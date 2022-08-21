package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
	
	private double progress;
	
	private Long idUser;
	
	private List<Long> tasksIds = new ArrayList<Long>();
	 
	private String thereIsError = "Os dados estão corretos.";
	
	public ProjectDto(Project project)
	{
		this.id = project.getId();
		this.title = project.getTitle();
		this.description = project.getDescription();
		this.dateTimeEnd = project.getDateTimeEnd();
		this.dateTimeStart = project.getDateTimeStart();
		this.idUser = project.getUser().getId();
		this.progress= project.getProgressStatus();
		
		for(Task task : project.getTasks()) {
			TaskDto taskToAdd = new TaskDto(task);
			tasksIds.add(taskToAdd.getId());
		}
	}
	
	
	public ProjectDto(Project project, String messageError)
	{
		this.thereIsError = messageError;
		this.id = project.getId();
		this.title = project.getTitle();
		this.description = project.getDescription();
		this.dateTimeEnd = project.getDateTimeEnd();
		this.dateTimeStart = project.getDateTimeStart();
		this.idUser = project.getUser().getId();
		this.progress= project.getProgressStatus();
		
		for(Task task : project.getTasks()) {
			TaskDto taskToAdd = new TaskDto(task);
			tasksIds.add(taskToAdd.getId());
		}
	}
	
	public Long getId () {
		return this.id;
	}
	
	public Long getIdUser() {
		return this.idUser;
	}
	
	public List<Long> getTasksIds(){
		return this.tasksIds;
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
	
	public double getProgress() {
		return this.progress;
	}
	
	public String getThereIsError() {
		return thereIsError;
	}
	
	public void setThereIsError(String thereIsError) {
		this.thereIsError=thereIsError;
	}
}
