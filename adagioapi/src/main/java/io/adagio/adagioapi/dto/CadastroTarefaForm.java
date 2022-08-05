package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.UserRepository;

public class CadastroTarefaForm {

	@NotBlank
	private String title;

	private String description;

	@NotNull
	private LocalDateTime dateTimeStart;

	@NotNull
	private LocalDateTime dateTimeEnd;

	private boolean finishedStatus;

	private Long idProject;

	private ArrayList <Notification> notifications;

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
		return idProject;
	}

	public void setIdProject(Long idProject) {
		this.idProject = idProject;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public ArrayList<Notification> getNotifications() {
		return notifications;
	}

	public void setNotifications(ArrayList<Notification> notifications) {
		
		this.notifications = notifications;
		
	}

	public Task converter(User user, ProjectRepository projectRepository ) {
		
		if(idProject == null)
			return new Task(this, user, null);
		
		Optional<Project> project = projectRepository.findById(idProject);
		
		if(project.isEmpty())
			return new Task(this, user, null);
			
		return new Task(this, user, project.get());
	}
	
}
