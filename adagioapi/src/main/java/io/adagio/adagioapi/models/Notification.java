package io.adagio.adagioapi.models;

import java.time.LocalDateTime;import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "notifications")
public class Notification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name = "id")
	private long id;

	@NotNull
	@DateTimeFormat
	@Column(name = "dateTime")
	private LocalDateTime dateTime;

	@NotNull
	@Column(name = "category")
	private Category category;

	@ManyToOne
	@JoinColumn(name="task_id")
	@JsonBackReference
	private Task task;
	
	public Notification () {}
	
	public Notification (Notification notification, Task task) {
		
		this.id = notification.getId();
		this.dateTime = task.getDateTimeStart();
		this.category = notification.getCategory();
		this.task = task;
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	
}
