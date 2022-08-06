package io.adagio.adagioapi.dto;

public class TaskQueryDTO {
	
	private String title;
	private Long projectId;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

}
