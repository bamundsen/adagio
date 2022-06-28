package io.adagio.adagioapi.models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import io.adagio.adagioapi.dto.CadastroTarefaForm;

@Entity
@Table(name="tarefas")
public class Task {
	
	@Id
	@NotNull
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String title;
	
	private String description;
	
	@NotNull
	@DateTimeFormat
	private LocalDateTime dataHoraInicio;
	
	@NotNull
	@DateTimeFormat
	private LocalDateTime dataHoraFim;
	
	private boolean finished;
	
	private Long projectCod;
	
	public Task () {}
	
	public Task (CadastroTarefaForm cadastroTarefaForm) {
		
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

	public LocalDateTime getDataHoraInicio() {
		return dataHoraInicio;
	}

	public void setDataHoraInicio(LocalDateTime dataHoraInicio) {
		this.dataHoraInicio = dataHoraInicio;
	}

	public LocalDateTime getDataHoraFim() {
		return dataHoraFim;
	}

	public void setDataHoraFim(LocalDateTime dataHoraFim) {
		this.dataHoraFim = dataHoraFim;
	}

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	public Long getProjectCod() {
		return projectCod;
	}

	public void setProjectCod(Long projectCod) {
		this.projectCod = projectCod;
	}

	
}
