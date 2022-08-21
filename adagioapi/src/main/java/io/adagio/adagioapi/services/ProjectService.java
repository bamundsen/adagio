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

	@Autowired
	private TaskService taskService;
	
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
	
	public void vinculateTasksToProject(List<Task> tasks, Project project,User logged) {
		
		for(Task task:tasks) {
			if(task.getProject() == null) {
				task.setProject(project);
				taskRepository.save(task);
			}
		}
		
		project.setProgressStatus(taskService.setProjectFinishedStatusByTasks(taskRepository.findByProjectAndUser(project, logged)));
	}
	

	public boolean finalIsGreaterThanInitialDate(Project project) {
		return project.getDateTimeEnd().isAfter(project.getDateTimeStart());
	}
	
	private boolean taskDatesAreInvalid(Task task, Project project) {
		return task.getDateTimeEnd().isAfter(project.getDateTimeEnd()) || task.getDateTimeEnd().isBefore(project.getDateTimeStart())
				 || task.getDateTimeStart().isAfter(project.getDateTimeEnd()) || task.getDateTimeStart().isBefore(project.getDateTimeStart());
	}
	
	public boolean tasksAreWithinTimeOfProject(Project project, List<Task> tasks) {
		boolean valid = true;
		
		for(Task task : tasks) {
			if(taskDatesAreInvalid(task,project)) {
				valid = false;
				break;
			}
		}
		
		return valid;
	}
}
