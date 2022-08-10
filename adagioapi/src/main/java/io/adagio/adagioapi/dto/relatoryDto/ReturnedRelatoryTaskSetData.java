package io.adagio.adagioapi.dto.relatoryDto;

import java.util.ArrayList;
import java.util.List;

import io.adagio.adagioapi.dto.TaskDto;

public class ReturnedRelatoryTaskSetData extends ReturnedRelatorySetData {

	private List<TaskDto> tasks = new ArrayList<TaskDto>();


	public List<TaskDto> getTasks() {
		return tasks;
	}

	public void setTasks(List<TaskDto> tasks) {
		this.tasks = tasks;
	}
	
	
}
