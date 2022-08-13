package io.adagio.adagioapi.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.CadastroTarefaForm;
import io.adagio.adagioapi.models.Category;
import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.repositories.TaskRepository;

@Service
public class TaskService {
	
	public final int NOTIFICATIONLIMIT = 3;
	
	public boolean validTaskTime (Task task, Long userId, TaskRepository taskRepository) {		
		List<Task> tasksBack = taskRepository.findByDate_Time_EndAndUser_IdNative(task.getDateTimeEnd().toLocalDate(), userId);
		
		for (Task t : tasksBack) {
			if (task.getDateTimeStart().isBefore(t.getDateTimeEnd()) 
					|| task.getDateTimeEnd().isBefore(t.getDateTimeStart())) {
				
				return false;
			}
				
		}
		
		return true;
	}
	public boolean validTaskTime (Task task, Long userId, TaskRepository taskRepository, Long taskId) {

		if (task.getDateTimeStart().isAfter(task.getDateTimeEnd()))
			return false;
		
		List<Task> tasksBack = taskRepository.findByDate_Time_EndAndUser_IdNative(task.getDateTimeEnd().toLocalDate(), userId);

		for (Task t : tasksBack) {
			if ((task.getDateTimeStart().isBefore(t.getDateTimeEnd()) 
					|| task.getDateTimeEnd().isBefore(t.getDateTimeStart()))
					&& taskId != t.getId()) {
				
				return false;
			}	
		}
		
		return true;
	}
	
	public boolean validTaskTimeEnd(Task task) {
		if (task.getDateTimeStart().isAfter(task.getDateTimeEnd()))
			return false;
		return true;
	}

	public ArrayList<Notification> notificationPattern (List<Notification> notifications){
		boolean notificationPopup = false,
				notificationSound = false,
				notificationEmail = false;
		Category popup = Category.POPUP,
				sound = Category.SOUND,
				email = Category.EMAIL;
		ArrayList<Notification> notificationsBack = new ArrayList<Notification>();
		
		if (notifications.size() > NOTIFICATIONLIMIT) {
			for (int i = NOTIFICATIONLIMIT; i < notifications.size(); i++) {
				notifications.remove(i);
			}
		}
		
		for (Notification n : notifications) {			
			if(n.getCategory().equals(popup) && !notificationPopup) {
				notificationPopup = true;
				notificationsBack.add(n);
			}
			else if(n.getCategory().equals(sound) && !notificationSound) {
				notificationSound = true;
				notificationsBack.add(n);
			}
			else if(n.getCategory().equals(email) && !notificationEmail) {
				notificationEmail = true;
				notificationsBack.add(n);
			}
		}
		return notificationsBack;
	}
	
	public LocalDateTime taskDateBuilder (CadastroTarefaForm taskForm) {
		return LocalDateTime.of(taskForm.getDateTimeStart().toLocalDate(), taskForm.getDateTimeEnd().toLocalTime());
	}
	
	public float setProjectFinishedStatusByTasks(List<Task> tasks) {
		int completedTasks = 0;
		float finishedStatus = 0;
		
		if(tasks.size() > 0) {
			if(tasks.get(0).getProject() != null) {
				for(Task t : tasks) {
					if(t.isFinishedStatus())
						completedTasks++;
				}
				finishedStatus = ((100*completedTasks)/tasks.size());
				
			}
		}

		
		return finishedStatus;
	}
}
