package io.adagio.adagioapi.dto;

import java.util.ArrayList;
import java.util.List;

public class ReturnedRelatoryTaskSetData {

	private long totalHours;
	
	private long quantityOfTasks;
	
	private List<TaskDto> tasks = new ArrayList<TaskDto>();

	public long getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(long totalHours) {
		this.totalHours = totalHours;
	}

	public long getQuantityOfTasks() {
		return quantityOfTasks;
	}

	public void setQuantityOfTasks(long quantityOfTasks) {
		this.quantityOfTasks = quantityOfTasks;
	}

	public List<TaskDto> getTasks() {
		return tasks;
	}

	public void setTasks(List<TaskDto> tasks) {
		this.tasks = tasks;
	}
	
	
}
