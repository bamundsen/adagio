package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;
import java.util.List;

import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Task;

public class TaskDto {
	
	private Long id;
	
	private String title;

	private String description;

	private LocalDateTime dateTimeStart;

	private LocalDateTime dateTimeEnd;
	
	private Long idUser;
	
	private boolean finishedStatus;
	
	private Long idProject;
	
	private Priority priority;
	
	private List<Notification> notifications;
	
	private String excetpionMessage;
	
	public TaskDto(Task task) {
		
		this.id = task.getId();
		this.title = task.getTitle();
		this.description = task.getDescription();
		this.dateTimeEnd = task.getDateTimeEnd();
		this.dateTimeStart = task.getDateTimeStart();
		this.idUser = task.getUser().getId();
		this.finishedStatus = task.isFinishedStatus();
		
		if(task.getProject() != null)
			this.idProject = task.getProject().getId();
		
		this.priority = task.getPriority();
		
		if(task.getNotifications() != null)
			this.notifications = task.getNotifications();
	}
	public TaskDto(Task task, String exceptionMessage) {
		
		this.id = task.getId();
		this.title = task.getTitle();
		this.description = task.getDescription();
		this.dateTimeEnd = task.getDateTimeEnd();
		this.dateTimeStart = task.getDateTimeStart();
		this.idUser = task.getUser().getId();
		this.finishedStatus = task.isFinishedStatus();
		
		if(task.getProject() != null)
			this.idProject = task.getProject().getId();
		
		this.priority = task.getPriority();
		
		if(task.getNotifications() != null)
			this.notifications = task.getNotifications();
			
		this.excetpionMessage = exceptionMessage;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public LocalDateTime getDateTimeStart() {
		return dateTimeStart;
	}

	public LocalDateTime getDateTimeEnd() {
		return dateTimeEnd;
	}

	public Long getIdUser() {
		return idUser;
	}

	public boolean getFinishedStatus() {
		return finishedStatus;
	}

	public Long getIdProject() {
		return idProject;
	}

	public Priority getPriority() {
		return priority;
	}

	public List<Notification> getNotifications() {
		return notifications;
	}
	public String getExcetpionMessage() {
		return excetpionMessage;
	}

}
