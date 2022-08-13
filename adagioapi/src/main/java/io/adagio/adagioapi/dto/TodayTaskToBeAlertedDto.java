package io.adagio.adagioapi.dto;

import java.text.MessageFormat;
import java.time.LocalDateTime;

import io.adagio.adagioapi.models.Priority;
import io.adagio.adagioapi.models.Task;

public class TodayTaskToBeAlertedDto {

	private String title;
	
	private String startAndEndHourGrouped;
	
	private Priority priority;
	
	private String projectName;

	public TodayTaskToBeAlertedDto() {}
	
	public TodayTaskToBeAlertedDto(Task task) {
		this.title = task.getTitle();
		this.startAndEndHourGrouped = getStartAndEndHourGroupedFormatted(task.getDateTimeStart(), task.getDateTimeEnd());
		this.priority = task.getPriority();
		
		if(task.getProject() != null) {
			this.projectName = task.getProject().getTitle();
		}
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStartAndEndHourGrouped() {
		return startAndEndHourGrouped;
	}

	public void setStartAndEndHourGrouped(String startAndEndHourGrouped) {
		this.startAndEndHourGrouped = startAndEndHourGrouped;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	
	public String getStartAndEndHourGroupedFormatted(LocalDateTime start, LocalDateTime end) {
		return MessageFormat.format("{0}:{1} - {2}:{3}",start.getHour(), start.getMinute(), end.getHour(), end.getMinute());
	}
}
