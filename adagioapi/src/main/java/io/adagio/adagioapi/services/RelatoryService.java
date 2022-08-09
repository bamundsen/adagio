package io.adagio.adagioapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;

@Service
public class RelatoryService {

	@Autowired
	public ProjectRepository projectRepository;
	
	@Autowired
	public TaskRepository taskRepository;
	
	public ReturnedRelatoryTaskSetData getByMonth(User logged, Integer month,Integer year) {
		
		ReturnedRelatoryTaskSetData relatory = new ReturnedRelatoryTaskSetData();
		List<TaskDto> tasksDto = new ArrayList<TaskDto>();
		
		List<Task> tasks = taskRepository.findByUser(logged);
		
		for(Task task : tasks) {

			if(task.getDateTimeStart().getMonth().getValue() == month && task.getDateTimeStart().getYear() == year) {
				TaskDto taskDto = new TaskDto(task);
				tasksDto.add(taskDto);
			}
		}
		
		relatory.setTasks(tasksDto);
		
		return relatory;
	}
}
