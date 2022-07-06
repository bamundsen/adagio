package io.adagio.adagioapi.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import io.adagio.adagioapi.dto.CadastroTarefaForm;

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
	@NotBlank
	@Column(name = "dateTimeStart")
	private LocalDateTime dateTimeStart;

	@DateTimeFormat
	@NotBlank
	@Column(name = "dateTimeEnd")
	private LocalDateTime dateTimeEnd;

	private boolean finishedStatus;

	//optativamente a tarefa terá um projeto relacionado a ela
	@ManyToOne
	@JoinColumn(name="project_id", nullable=true)
	private Project project;

	@OneToMany(mappedBy = "task")
	private List<Notification> notifications;

	@NotNull
	@Column(name = "priority")
	private Priority priority;

	public Task () {}

	public Task (CadastroTarefaForm cadastroTaskForm) {
		this.title = cadastroTaskForm.getTitle();
		this.description = cadastroTaskForm.getDescription();
		this.dateTimeStart = cadastroTaskForm.getDateTimeStart();
		this.dateTimeEnd = cadastroTaskForm.getDateTimeEnd();
		this.project = cadastroTaskForm.getProject();
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

	public void setNotification(ArrayList<Notification> notifications) {
		this.notifications = notifications;
	}
	
	
}
