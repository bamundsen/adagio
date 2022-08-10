package io.adagio.adagioapi.services;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.ReturnedRelatoryTaskSetData;
import io.adagio.adagioapi.dto.TaskDto;
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
	
	public ReturnedRelatoryTaskSetData getByMonth(User logged, Integer month,Integer year,RelatoryBy relatoryBy ) {
		
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
		
		relatory.setQuantityOfTasks(tasksDto.size());
		relatory.setTotalHours(returnTotalHours(tasksDto));
		relatory.setTasks(tasksDto);
		
		return relatory;
	}
	
	public ReturnedRelatoryTaskSetData getByDay(User logged, LocalDateTime startDate, LocalDateTime endDate, RelatoryBy relatoryBy) {
		ReturnedRelatoryTaskSetData relatory = new ReturnedRelatoryTaskSetData();
		
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanAndProjectIsNull(logged,
				startDate,
				endDate);
		
		List<TaskDto> tasksDto = Task.converter(tasks);
		
		relatory.setQuantityOfTasks(tasksDto.size());
		relatory.setTotalHours(returnTotalHours(tasksDto));
		relatory.setTasks(tasksDto);
		return relatory;
		
	}
	

	public Long returnTotalHours(List<TaskDto> tasks) {
		Long totalHours =(long) 0;
		
		for(TaskDto t:tasks) {
			if(t.getDateTimeEnd().isAfter(t.getDateTimeStart())) {
				LocalDateTime tempDateTime = LocalDateTime.from(t.getDateTimeStart());
				
				
				
				totalHours += tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.HOURS);
				
				System.out.println(tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.DAYS));
				System.out.println("DURAÇÃO "+totalHours);
			}
		}
		
		return totalHours;
	}
	/*
	public String returnDurationMessage(List<TaskDto> tasks) {
		String message = "";
		
		for(TaskDto t:tasks) {
			if(t.getDateTimeEnd().isAfter(t.getDateTimeStart())) {
				LocalDateTime tempDateTime = LocalDateTime.from(t.getDateTimeStart());
				
				Long years = tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.YEARS);
				tempDateTime = tempDateTime.plusYears(years);
				
				Long months = tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.MONTHS);
				tempDateTime = tempDateTime.plusMonths(months);
				
				Long days = tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.DAYS);
				tempDateTime = tempDateTime.plusDays(days);
				
				Long hours = tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.HOURS);
				tempDateTime = tempDateTime.plusHours(hours);
				
				Long minutes = tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.MINUTES);
				tempDateTime = tempDateTime.plusMinutes(minutes);
				
				Long seconds = tempDateTime.until(t.getDateTimeEnd(), ChronoUnit.SECONDS);
				
				message =  MessageFormat.format("{0} anos(s), {1} meses, {2} dias, {3} horas, {4} minutos, e {5} segundos" , years.toString(),
						months.toString(), days.toString(), hours.toString(), minutes.toString(), seconds.toString());
			}
		}
		
		return 0;
	}
	*/
}
