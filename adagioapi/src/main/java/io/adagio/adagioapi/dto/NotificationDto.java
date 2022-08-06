package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;

import io.adagio.adagioapi.models.Category;
import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Task;

public class NotificationDto {
	
	private Long id;
	
	private LocalDateTime dateTime;
	
	private Category category;
	
	private Long idTask;
	
	private Task task;
	
	public NotificationDto(Notification notification) {
		
		this.id = notification.getId();
		this.dateTime = notification.getDateTime();
		this.category = notification.getCategory();
		this.idTask = notification.getTask().getId();
		
	}
	

	public Long getId() {
		return id;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public Category getCategory() {
		return category;
	}

	public Long getIdTask() {
		return idTask;
	}

	public Task getTask() {
		return task;
	}

	
	
}
