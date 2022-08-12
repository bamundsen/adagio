package io.adagio.adagioapi.dto.relatoryDto;

public class ReturnedRelatorySetData {

	private Long totalHours;
	
	private Long quantityOfElements;
	
	private int page;
	
	public Long getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(Long totalHours) {
		this.totalHours=totalHours;
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
