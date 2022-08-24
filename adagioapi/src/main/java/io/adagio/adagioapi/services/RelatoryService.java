package io.adagio.adagioapi.services;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.ProjectDto;
import io.adagio.adagioapi.dto.TaskDto;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryProjectSetData;
import io.adagio.adagioapi.dto.relatoryDto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.ProjectRepository;
import io.adagio.adagioapi.repositories.TaskRepository;
import io.adagio.adagioapi.utils.RelatoryBy;

@Service
public class RelatoryService {

	@Autowired
	public ProjectRepository projectRepository;
	
	@Autowired
	public TaskRepository taskRepository;
	
	public ReturnedRelatoryTaskSetData getByMonthOrYear(User logged, Integer month,Integer year,RelatoryBy relatoryBy ) {
		
		ReturnedRelatoryTaskSetData relatory = new ReturnedRelatoryTaskSetData();
		List<TaskDto> tasksDto = new ArrayList<TaskDto>();
		
		List<Task> tasks = taskRepository.findByUser(logged);
		
		for(Task task : tasks) {
			
			if(relatoryBy == RelatoryBy.TASKS_BY_MONTH && task.getDateTimeStart().getMonth().getValue() == month && task.getDateTimeStart().getYear() == year ) {
				TaskDto taskDto = new TaskDto(task);
				tasksDto.add(taskDto);
			} else if(relatoryBy == RelatoryBy.TASKS_BY_YEAR && task.getDateTimeStart().getYear() == year) {
				TaskDto taskDto = new TaskDto(task);
				tasksDto.add(taskDto);
			}
		
		}
		
		relatory.setQuantityOfElements(tasksDto.size());
		relatory.setTotalHours(returnTotalHoursOrMinutes(tasksDto,TimeUnit.HOURS));
		relatory.setTotalMinutes(returnTotalHoursOrMinutes(tasksDto,TimeUnit.MINUTES));
		relatory.setTotalSeconds(returnTotalHoursOrMinutes(tasksDto,TimeUnit.SECONDS));
		relatory.setTasks(tasksDto);
		
		return relatory;
	}
	
	public ReturnedRelatoryTaskSetData getByDay(User logged, LocalDateTime startDate, LocalDateTime endDate, RelatoryBy relatoryBy) {
		ReturnedRelatoryTaskSetData relatory = new ReturnedRelatoryTaskSetData();
		
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanEqual(logged,
				startDate,
				endDate);
		
		List<TaskDto> tasksDto = Task.convertListToListTaskDto(tasks);
		
		relatory.setQuantityOfElements(tasksDto.size());
		relatory.setTotalHours(returnTotalHoursOrMinutes(tasksDto, TimeUnit.HOURS));
		relatory.setTotalMinutes(returnTotalHoursOrMinutes(tasksDto, TimeUnit.MINUTES));
		relatory.setTotalSeconds(returnTotalHoursOrMinutes(tasksDto, TimeUnit.SECONDS));
		relatory.setTasks(tasksDto);
		return relatory;
		
	}
	
	public ReturnedRelatoryTaskSetData getByPageAndProject(User user, Long idProject, Pageable pagination) {
		ReturnedRelatoryTaskSetData relatory = new ReturnedRelatoryTaskSetData();
		
		if(idProject != null) {
			Optional<Project> project = projectRepository.findByIdAndUser(idProject, user);
			
			if(project.isPresent()) {
				Page<Task> tasks = taskRepository.findByProjectAndUser(project.get(), user,pagination);
				
				List<TaskDto> tasksDto = Task.convertListToListTaskDto(tasks.getContent());
				
				relatory.setQuantityOfElements(tasksDto.size());
				relatory.setTotalHours(returnTotalHoursOrMinutes(tasksDto,TimeUnit.HOURS));
				relatory.setTotalMinutes(returnTotalHoursOrMinutes(tasksDto,TimeUnit.MINUTES));
				relatory.setTotalSeconds(returnTotalHoursOrMinutes(tasksDto,TimeUnit.SECONDS));
				relatory.setProjectName(project.get().getTitle());
				relatory.setPage(pagination.getPageNumber()+1);
				relatory.setTasks(tasksDto);
			}
		}
		return relatory;
	}
	
	public ReturnedRelatoryProjectSetData getProjectsByPage(User user, Pageable pagination) {
		ReturnedRelatoryProjectSetData relatory = new ReturnedRelatoryProjectSetData();
		
		Page<Project> projects = projectRepository.findByUser(user, pagination);

		List<ProjectDto> projectsDto = Project.convertListToProjectsListDto(projects.getContent());
		
		relatory.setQuantityOfElements(projectsDto.size());
		relatory.setTotalHours(returnTotalHoursOrMinutesOfProjects(projectsDto,TimeUnit.HOURS));
		relatory.setTotalMinutes(returnTotalHoursOrMinutesOfProjects(projectsDto,TimeUnit.MINUTES));
		relatory.setTotalSeconds(returnTotalHoursOrMinutesOfProjects(projectsDto,TimeUnit.SECONDS));
		relatory.setPage(pagination.getPageNumber()+1);
		relatory.setProjects(projectsDto);
		
		return relatory;
	}
	
	private Long returnTotalHoursOrMinutes(List<TaskDto> tasks,TimeUnit timeUnit) {
		Long totalSeconds =(long) 0;
		Long valueToReturn = (long) 0;
		 
		for(TaskDto t:tasks) {
			if(t.getDateTimeEnd().isAfter(t.getDateTimeStart())) {
				LocalDateTime tempDateTime = LocalDateTime.from(t.getDateTimeStart());
							
				totalSeconds += tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.SECONDS);
			
	
			}
		}
		
		if(timeUnit == TimeUnit.HOURS) {
			valueToReturn = totalSeconds / 3600;
		} else if(timeUnit == TimeUnit.MINUTES) {
			valueToReturn = (totalSeconds - ((totalSeconds / 3600) * 3600 )) / 60;
		} else if(timeUnit == TimeUnit.SECONDS) {
			valueToReturn = totalSeconds % 60;
		}
		
		return valueToReturn;
	}
	
	private Long returnTotalHoursOrMinutesOfProjects(List<ProjectDto> projects,TimeUnit timeUnit) {
		Long totalSeconds =(long) 0;
		Long valueToReturn = (long) 0;
		
		for(ProjectDto p:projects) {
			if(p.getDateTimeEnd().isAfter(p.getDateTimeStart())) {
				LocalDateTime tempDateTime = LocalDateTime.from(p.getDateTimeStart());
							
				totalSeconds += tempDateTime.until(p.getDateTimeEnd(), ChronoUnit.SECONDS);
				
			}
		}
		
		if(timeUnit == TimeUnit.HOURS) {
			valueToReturn = totalSeconds / 3600;
		} else if(timeUnit == TimeUnit.MINUTES) {
			valueToReturn = (totalSeconds - ((totalSeconds / 3600 ) * 3600)) / 60;
		} else if(timeUnit == TimeUnit.SECONDS) {
			valueToReturn = totalSeconds % 60;
		}
		
		return valueToReturn;
		
	}
	
	enum TimeUnit {
		MINUTES, HOURS,SECONDS
	}
	
}
