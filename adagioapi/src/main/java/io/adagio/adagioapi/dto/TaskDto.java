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
	
	public TaskDto(Task task) {
		
		this.id = task.getId();
		this.title = task.getTitle();
		this.description = task.getDescription();
		this.dateTimeEnd = task.getDateTimeEnd();
		this.dateTimeStart = task.getDateTimeStart();
		this.idUser = task.getUser().getId();
		this.finishedStatus = task.isFinishedStatus();
		this.idProject = task.getProject().getId();
		this.priority = task.getPriority();
		this.notifications = task.getNotifications();
	}

}