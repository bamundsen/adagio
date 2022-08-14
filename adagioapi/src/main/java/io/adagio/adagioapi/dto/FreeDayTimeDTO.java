package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;

public class FreeDayTimeDTO {
	
	private String freeDayTime;
	
	private LocalDateTime localDateTime;
	
	public FreeDayTimeDTO(LocalDateTime localDateTime) {
		this.localDateTime = localDateTime;
		
	}
	
	public FreeDayTimeDTO(String hours, String minutes, String seconds) {
		this.freeDayTime = "Tempo disponível: " + hours + " horas, " + minutes + " minutos e " + seconds + " segundos.";
		
	}

	public String getFreeDayTime() {
		return freeDayTime;
	}

	public LocalDateTime getLocalDateTime() {
		return localDateTime;
	}

}
