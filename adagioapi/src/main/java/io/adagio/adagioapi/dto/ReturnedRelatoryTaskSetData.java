package io.adagio.adagioapi.dto;

import java.util.ArrayList;
import java.util.List;

public class ReturnedRelatoryTaskSetData {

	private Long totalHours;
	
	private Long quantityOfTasks;
	
	private List<TaskDto> tasks = new ArrayList<TaskDto>();

	public Long getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(Long totalHours) {
		this.totalHours=totalHours;
	}

	public Long getQuantityOfTasks() {
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
