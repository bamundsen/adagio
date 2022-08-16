package io.adagio.adagioapi.dto.relatoryDto;

import java.text.MessageFormat;

public class ReturnedRelatorySetData {

	private Long totalHours;
	
	private Long totalMinutes;
	
	private Long totalSeconds;
	
	private Long quantityOfElements;
	
	private String messageDuration;
	
	private int page;
	
	public Long getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(Long totalHours) {
		this.totalHours=totalHours;
		defineMessageDuration();
	}
	
	public Long getTotalMinutes() {
		return totalMinutes;
	}

	public void setTotalMinutes(Long totalMinutes) {
		this.totalMinutes = totalMinutes;
		defineMessageDuration();
	}
	
	public Long getTotalSeconds() {
		return totalSeconds;
	}
	
	public void setTotalSeconds (Long totalSeconds) {
		this.totalSeconds  = totalSeconds;
		defineMessageDuration();
	}
	
	public String getMessageDuration() {
		return messageDuration;
	}
	
	private void defineMessageDuration() {
		this.messageDuration = MessageFormat.format("{0} horas, {1} minutos,{2} segundos", totalHours, totalMinutes,totalSeconds);
	}
	
	public Long getQuantityOfElements() {
		return quantityOfElements;
	}

	public void setQuantityOfElements(long quantityOfElements) {
		this.quantityOfElements = quantityOfElements;
	}
	
	public int getPage(){
		return page;
	}
	
	public void setPage(int page) {
		this.page = page;
	}
}
