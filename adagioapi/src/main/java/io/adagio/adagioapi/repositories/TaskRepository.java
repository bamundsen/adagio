package io.adagio.adagioapi.repositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	Optional<Task> findByIdAndUser(Long id, User user);
	
	List<Task> findByUserAndDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(User user,LocalDateTime dateTimeStart,LocalDateTime dateTimeEnd);
	List<Task> findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanEqual(User user,LocalDateTime dateTimeStartMin,LocalDateTime dateTimeStartMax);
	List<Task> findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThan(User user,LocalDateTime dateTimeStartMin,LocalDateTime dateTimeStartMax);
	
	List<Task> findByUserAndDateTimeStartGreaterThanEqual(User user,LocalDateTime dateTimeStartMin);
	
	void deleteByIdAndUser(Long id, User user);

}
