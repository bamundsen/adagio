package io.adagio.adagioapi.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.adagio.adagioapi.dto.FreeDayTimeDTO;
import io.adagio.adagioapi.dto.QuantityOfTasksAuxDto;
import io.adagio.adagioapi.dto.TodayTaskToBeAlertedDto;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.TaskRepository;

@Service
public class AuxInformationService {
	
	private final int DAY_SECONDS = 86400;

	@Autowired
	private TaskRepository taskRepository;
	
	public ResponseEntity<QuantityOfTasksAuxDto> getQuantityOfTasksFromToday(User logged) {

		QuantityOfTasksAuxDto quantityOfTasksAuxDto = new QuantityOfTasksAuxDto();
		
		LocalDateTime todayBegin = getTodayWithHour(0,0,0);
		
		LocalDateTime todayEnd = getTodayWithHour(23,59,0);
		
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(logged, todayBegin,todayEnd);
		
		quantityOfTasksAuxDto.setQuantityOfTasks(tasks.size());
		
		return ResponseEntity.ok().body(quantityOfTasksAuxDto);
	}
	
<<<<<<< Updated upstream
	public ResponseEntity<List<TodayTaskToBeAlertedDto>> getTodayTasksToBeAlerted(User logged){
		List<Task> tasks = taskRepository.findByUserAndDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(logged, 
							getTodayWithHour(0,0,0), getTodayWithHour(23,59,0));
		
		List<TodayTaskToBeAlertedDto> todayTasks = Task.convertToTodayTasks(tasks);
		
		return ResponseEntity.ok().body(todayTasks);
	}
	
	private LocalDateTime getTodayWithHour(int hour, int minute, int second) {
		
		return LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonth(), LocalDateTime.now().getDayOfMonth(),
				hour,minute,second);
		
=======
	public ResponseEntity<FreeDayTimeDTO> getFreeDayTime(User logged, LocalDate localDate){
		
		List<Task> tasks = taskRepository.findByDate_Time_EndAndUser_IdNative(localDate, logged.getId());
		int secondsUsed = 0,
				secondsLeft = DAY_SECONDS;
	
		
		for (Task t : tasks) {
			secondsUsed += (t.getDateTimeEnd().toLocalTime().toSecondOfDay()
					- t.getDateTimeStart().toLocalTime().toSecondOfDay());
		}
		
		secondsLeft -= secondsUsed;
		int hoursLeft = (secondsLeft / 3600);
		secondsLeft -= (hoursLeft*3600);
		int minutesLeft = (secondsLeft / 60);
		secondsLeft -= (minutesLeft*60);
		
		return ResponseEntity.ok().body(new FreeDayTimeDTO(
				Integer.toString(hoursLeft), 	
				Integer.toString(minutesLeft), 
				Integer.toString(secondsLeft)));
>>>>>>> Stashed changes
	}
}
