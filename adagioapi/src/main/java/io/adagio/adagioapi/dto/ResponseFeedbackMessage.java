package io.adagio.adagioapi.dto;

public class ResponseFeedbackMessage {

	private String mensagem;
	private Integer status;
	
	public ResponseFeedbackMessage(String mensagem, Integer status) {
		this.mensagem = mensagem;
		this.status = status;
	}

	public String getMensagem() {
		return mensagem;
	}

	public Integer getStatus() {
		return status;
	}
	
	
}
