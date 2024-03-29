package io.adagio.adagioapi.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.adagio.adagioapi.dto.RegisterTaskForm;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.TodayTaskToBeAlertedDto;
import io.adagio.adagioapi.services.TaskService;

@Entity
@Table(name="tasks")
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;

	@NotBlank
	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@DateTimeFormat
	@NotNull
	@Column(name = "dateTimeStart")
	private LocalDateTime dateTimeStart;

	@DateTimeFormat
	@NotNull
	@Column(name = "dateTimeEnd")
	private LocalDateTime dateTimeEnd;

	private boolean finishedStatus;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="project_id", nullable=true)
	private Project project;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=true)
	private User user;

	@Valid
	@Nullable
	@OneToMany(cascade = CascadeType.ALL, mappedBy="task", targetEntity = Notification.class)
	@JsonManagedReference
	private List<Notification> notifications;

	@NotNull
	@Column(name = "priority")
	private Priority priority;

	public Task () {}

	public Task (RegisterTaskForm cadastroTaskForm, User user, Project project) {
		this.title = cadastroTaskForm.getTitle();
		this.description = cadastroTaskForm.getDescription();
		this.dateTimeStart = cadastroTaskForm.getDateTimeStart();
		this.dateTimeEnd = cadastroTaskForm.getDateTimeEnd();
		this.project = project;
		this.user = user;
		this.finishedStatus=cadastroTaskForm.getFinishedStatus();
		//if (cadastroTaskForm.getNotifications().get(0).getTask() != null)
			this.notifications = cadastroTaskForm.getNotifications();
		
		this.priority = cadastroTaskForm.getPriority();
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getDateTimeStart() {
		return dateTimeStart;
	}

	public void setDateTimeStart(LocalDateTime dateTimeStart) {
		this.dateTimeStart = dateTimeStart;
	}

	public LocalDateTime getDateTimeEnd() {
		return dateTimeEnd;
	}

	public void setDateTimeEnd(LocalDateTime dateTimeEnd) {
		this.dateTimeEnd = dateTimeEnd;
	}

	public boolean isFinishedStatus() {
		return finishedStatus;
	}

	public void setFinishedStatus(boolean finishedStatus) {
		this.finishedStatus = finishedStatus;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}


	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public List<Notification> getNotifications() {
		return notifications;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setNotifications(List<Notification> notifications) {
		this.notifications = notifications;
	}
	
	public static Page<TaskDto> convert(Page<Task> tasks){
		return tasks.map(TaskDto::new);
	}

	public static List<TaskDto> convertListToListTaskDto(List<Task> tasks){
		List<TaskDto> tasksDto = new ArrayList<>();
		
		for(Task task : tasks) {
			TaskDto taskDto = new TaskDto(task);
			tasksDto.add(taskDto);
		}
		return tasksDto;
	}
	
	public List<Long> convertNotificationsToIds(List<Notification> notifications){
		List<Long> notificationsIds = new ArrayList<>();
		
		for (Notification notification : notifications) {
			notificationsIds.add(notification.getId());
		}
		return notificationsIds;
	}
	
	public static List<TodayTaskToBeAlertedDto> convertToTodayTasks(List<Task> tasks){
		List<TodayTaskToBeAlertedDto> todayTasks = new ArrayList<>();
		
		for(Task task : tasks) {
			
			if(task.finishedStatus == false) {
				TodayTaskToBeAlertedDto todayTask = new TodayTaskToBeAlertedDto(task);
				todayTasks.add(todayTask);
			}
			
		}
		
		return todayTasks;
	}
}
