package io.adagio.adagioapi.repositories;

import java.time.LocalDateTime;
<<<<<<< HEAD
=======
import java.util.ArrayList;
import java.util.List;
>>>>>>> bd363d476d95aa466c0e81d1054a9dacde9ae986
import java.util.Optional;

import org.springframework.data.domain.Page;
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
	
	Optional<Task> findByTitleAndUser(String title, User user);
	
	Page<Task> findByProjectIdAndUser (Long id, User user);
	
	Page<Task> findByDateAndUser (LocalDateTime date, User user);

}
