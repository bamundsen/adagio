package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import io.adagio.adagioapi.models.Category;
import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;

public class CadastroTarefaForm {

	@NotBlank
	private String title;

	private String description;

	@NotNull
	private LocalDateTime dateTimeStart;

	@NotNull
	private LocalDateTime dateTimeEnd;

	private boolean finishedStatus;

	private Long projectId;
	
	private ArrayList<Long> notificationsIds;
	
	private ArrayList<Notification> notifications;
	
	@NotNull
	private Priority priority;

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

	public boolean isFinishedStatus() {
		return finishedStatus;
	}

	public void setFinishedStatus(boolean finishedStatus) {
		this.finishedStatus = finishedStatus;
	}

	public Long getIdProject() {
		return projectId;
	}

	public void setIdProject(Long projectId) {
		this.projectId = projectId;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
		
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public ArrayList<Long> getNotificationsIds() {
		return notificationsIds;
	}

	public void setNotificationsIds(ArrayList<Long> notificationIds) {
		this.notificationsIds = notificationIds;
	}
	
	public ArrayList<Notification> getNotifications() {
		return notifications;
	}

	public void setNotifications(ArrayList<Notification> notifications) {
		this.notifications = notifications;
	}

	public Task converter(User user, ProjectRepository projectRepository) {

		// validar notificaçoes
		
		// validar notificaçoes
		
		Optional<Project> project = projectRepository.findById(projectId);
		
		if(project.isEmpty() || projectId == null)
			return new Task(this, user, null);
			
		return new Task(this, user, project.get());
	}
	
	public Task update(Long id, TaskRepository taskRepository, ProjectRepository projectRepository) {
		Task task = taskRepository.getById(id);
		Project project = projectRepository.getById(projectId);

		task.setDateTimeEnd(dateTimeEnd);
		task.setDateTimeStart(dateTimeStart);
		task.setTitle(title);
		task.setDescription(description);
		task.setFinishedStatus(finishedStatus);
		task.setPriority(priority);
		task.setNotifications(notifications);
		
		task.setProject(project);
		
		return task;
	}
}
