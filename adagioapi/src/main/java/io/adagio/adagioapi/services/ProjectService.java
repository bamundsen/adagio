package io.adagio.adagioapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	public long deleteTasksByProjectAndUser(Project project,User user) {
		long deletados = 0;
		
		List<Task> tasks = taskRepository.findByProjectAndUser(project,user);
		
		for(Task task: tasks) {
			taskRepository.deleteByIdAndUser(task.getId(), user);
			deletados++;
		}
		
		System.out.println(deletados);
		
		return deletados;
	}
}
