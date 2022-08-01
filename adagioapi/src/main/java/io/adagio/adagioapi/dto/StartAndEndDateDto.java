package io.adagio.adagioapi.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

public class StartAndEndDateDto {

	@NotNull
	private LocalDateTime dateTimeStart;
	
	@NotNull
	private LocalDateTime dateTimeEnd;

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
		this.dateTimeEnd= dateTimeEnd;
	}
	
}
