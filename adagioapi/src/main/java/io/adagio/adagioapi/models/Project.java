package io.adagio.adagioapi.models;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import io.adagio.adagioapi.dto.CadastroProjetoForm;

@Entity
@Table(name = "projects")
public class Project {

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

	//Este atributo será gerado automaticamente
	@Column(name = "finishedStatus")
	private boolean finishedStatus;

	//Este atributo será gerado automaticamente
	@Column(name = "progressStatus")
	private double progressStatus;

	@OneToMany(mappedBy = "project")
	private List<Task> tasks;

	public Project () {}

	public Project (CadastroProjetoForm cadastroProjectForm) {
		this.title = cadastroProjectForm.getTitle();
		this.description = cadastroProjectForm.getDescription();
		this.dateTimeStart = cadastroProjectForm.getDateTimeStart();
		this.dateTimeEnd = cadastroProjectForm.getDateTimeEnd();
		this.tasks = cadastroProjectForm.getTasks();
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

	public double getProgressStatus() {
		return progressStatus;
	}

	public void setProgressStatus(double progressStatus) {
		this.progressStatus = progressStatus;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	
	
}
