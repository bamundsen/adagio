package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.repositories.UserRepository;

public class CadastroProjetoForm {
	
	@NotBlank
	private String title;

	@NotBlank
	private String description;

	@NotNull
	private LocalDateTime dateTimeStart;

	@NotNull
	private LocalDateTime dateTimeEnd;

	private List<Long> tasksIds;

	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getDateTimeStart() {
		return dateTimeStart;
	}

	public void setDateTimeStart(LocalDateTime dateTimeStart) {
		this.dateTimeStart = dateTimeStart;
	}

	public LocalDateTime getDateTimeEnd() {
		return dateTimeEnd;
	}

	public void setDateTimeEnd(LocalDateTime dateTimeEnd) {
		this.dateTimeEnd = dateTimeEnd;
	}

	public List<Long> getTasksIds() {
		return tasksIds;
	}

	public void setTasksIds(List<Long> tasksIds) {
		this.tasksIds = tasksIds;
	}

	public Project converter(TaskRepository taskRepository ,User user) {
		
		List<Task> tasks = new ArrayList<>();
		
		for(Long taskId : tasksIds) {
			Task task = taskRepository.getById(taskId);
			tasks.add(task);
		}
		
		return new Project(this, tasks, user);
	}

	public Project atualizar(Long id, ProjectRepository projectRepository,TaskRepository taskRepository) {
		Project project = projectRepository.getById(id);
		
		project.setDateTimeEnd(dateTimeEnd);
		project.setDateTimeStart(dateTimeStart);
		project.setTitle(title);
		project.setDescription(description);
		
		List<Task> tasks = new ArrayList<>();
		
		for(Long taskId : tasksIds) {
			Task task = taskRepository.getById(taskId);
			tasks.add(task);
		}
		
		project.setTasks(tasks);
		
		return project;
	}
}
