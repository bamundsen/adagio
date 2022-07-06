package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Project;

public class CadastroTarefaForm {

	@NotBlank
	private String title;

	private String description;

	@NotBlank
	private LocalDateTime dateTimeStart;

	@NotBlank
	private LocalDateTime dateTimeEnd;

	private boolean finishedStatus;

	private Project project;

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

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
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
	
	
	
}
