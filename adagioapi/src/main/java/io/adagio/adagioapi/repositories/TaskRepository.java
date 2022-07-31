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
	
	List<Task> findByDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(LocalDateTime dateTimeStart,LocalDateTime dateTimeEnd);
	
	List<Task> findByDateTimeStartGreaterThanEqual(LocalDateTime dateTimeStart);
	
	void deleteByIdAndUser(Long id, User user);

}
