package io.adagio.adagioapi.models;

public enum DefaultMessages {
	
	TASK_BAD_REQUEST("Erro ao processar tarefa"),
	TASK_BAD_TIME("Erro: o horário de fim deve ser posterior ao horário de inicio da tarefa."),
	TASK_CONFLICT_TIME("Erro: já existe uma tarefa cadastrada neste intervalo."),
	TASK_CONFLICT_PROJECT_TIME("Erro: a tarefa deve ser cadastrada dentro do intervalo de tempo do projeto selecionado."),
	PROJECT_WRONG_DATE_TIMES("Verifique as datas de projeto. Final deve ser maior que inicial ou os momentos devem ser iguais."),
	WRONG_TASKS_VINCULATED_TO_PROJECT("Verifique as datas das tarefas escolhidas. Elas devem estar dentro das datas final e inicial de projeto."),
	USER_REGISTER_PASSWORD_ERROR("Erro: a senha deve conter entre 8 e 30 caracteres, "
			+ "conter pelo menos uma letra maíuscula, um número e um caractere especial.");
	
	private final String message;
	
	DefaultMessages(final String message){
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
}
