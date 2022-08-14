package io.adagio.adagioapi.models;

public enum DefaultMessages {
	
	TASK_BAD_REQUEST("Erro ao processar tarefa"),
	TASK_BAD_TIME("Erro: o horário de fim deve ser posterior ao horário de inicio da tarefa."),
	TASK_CONFLICT_TIME("Erro: já existe uma tarefa cadastrada neste intervalo."),
	TASK_CONFLICT_PROJECT_TIME("Erro: a tarefa deve ser cadastrada dentro do intervalo de tempo do projeto selecionado.");
	
	private final String message;
	
	DefaultMessages(String message){
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
}
