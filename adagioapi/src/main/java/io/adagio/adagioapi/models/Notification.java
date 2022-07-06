package io.adagio.adagioapi.models;

import java.time.LocalDateTime;

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

@Entity
@Table(name = "notifications")
public class Notification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	private Task task;

}
