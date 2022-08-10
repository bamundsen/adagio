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

import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;

import io.adagio.adagioapi.dto.CadastroProjetoForm;
import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.dto.TaskDto;

@Entity
@Table(name = "projects")
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

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

	//Este atributo será gerado automaticamente
	@Column(name = "finishedStatus")
	private boolean finishedStatus;

	//Este atributo será gerado automaticamente
	@Column(name = "progressStatus")
	private double progressStatus;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=true)
	private User user;

	@OneToMany(mappedBy = "project")
	private List<Task> tasks;

	public Project () {}

	public Project (CadastroProjetoForm cadastroProjectForm, List<Task> tasks, User user) {
		this.title = cadastroProjectForm.getTitle();
		this.description = cadastroProjectForm.getDescription();
		this.dateTimeStart = cadastroProjectForm.getDateTimeStart();
		this.dateTimeEnd = cadastroProjectForm.getDateTimeEnd();
		this.tasks = tasks;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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
	
	public User getUser() {
		return user;
	}
	
	public static Page<ProjectDto> converter(Page<Project> projects){
		return projects.map(ProjectDto::new);
	}
	
	public static List<ProjectDto> converter(List<Project> projects){
		List<ProjectDto> projectsDto = new ArrayList<>();
		
		for(Project task : projects) {
			ProjectDto taskDto = new ProjectDto(task);
			projectsDto.add(taskDto);
		}
		return projectsDto;
	}
}
