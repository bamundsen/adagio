package io.adagio.adagioapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.OperationType;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;

@Service
public class ProjectService {

	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public long deleteTasksByProjectOrDesvinculateAndUser(Project project,User user,OperationType operation) {
		long deletados = 0;
		
		List<Task> tasks = taskRepository.findByProjectAndUser(project,user);
		
		for(Task task: tasks) {
			if(operation == OperationType.DELETE) {
				taskRepository.deleteByIdAndUser(task.getId(), user);
				deletados++;
			} else if(operation == OperationType.EDIT) {
				task.setProject(null);
				taskRepository.save(task);
			}

		}
		
		return deletados;
	}
	
	public void vinculateTasksToProject(List<Task> tasks, Project project) {
		
		for(Task task:tasks) {
			if(task.getProject() == null) {
				task.setProject(project);
				taskRepository.save(task);
			}
		}
	}
}
