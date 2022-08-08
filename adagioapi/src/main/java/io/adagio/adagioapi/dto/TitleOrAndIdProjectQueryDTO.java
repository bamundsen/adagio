package io.adagio.adagioapi.dto;

import javax.validation.constraints.Null;

public class TitleOrAndIdProjectQueryDTO {
	
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
		if(projectId != null)
			this.projectId = projectId;
	}

}
