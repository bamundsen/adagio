package io.adagio.adagioapi.models;

public enum DefaultMessages {
	
	TASK_BAD_TIME("Erro: o horário de fim deve ser posterior ao horário de inicio da tarefa."),
	TASK_CONFLICT_TIME("Erro: já existe uma tarefa cadastrada neste intervalo.");
	
	private final String message;
	
	DefaultMessages(String message){
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
}
