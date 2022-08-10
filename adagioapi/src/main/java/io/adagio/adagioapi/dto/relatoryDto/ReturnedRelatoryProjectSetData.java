package io.adagio.adagioapi.dto.relatoryDto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;

import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.models.Project;

public class ReturnedRelatoryProjectSetData extends ReturnedRelatorySetData{

	private List<ProjectDto> projects = new ArrayList<ProjectDto>();

	public List<ProjectDto> getProjects() {
		return projects;
	}

	public void setProjects(List<ProjectDto> projects) {
		this.projects = projects;
	}
	
	
}
