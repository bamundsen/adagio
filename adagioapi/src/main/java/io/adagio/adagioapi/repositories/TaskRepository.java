package io.adagio.adagioapi.repositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	Optional<Task> findByIdAndUser(Long id, User user);
	Page<Task> findByProjectAndUser(Project project, User user, Pageable pagination);
	List<Task> findByProjectAndUser(Project project, User user);
	Page<Task> findByUser(User user , Pageable pagination);

	List<Task> findByUserAndDateTimeStartGreaterThanEqualAndDateTimeEndLessThanEqual(User user,LocalDateTime dateTimeStart,LocalDateTime dateTimeEnd);
	List<Task> findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanEqual(User user,LocalDateTime dateTimeStartMin,LocalDateTime dateTimeStartMax);
	List<Task> findByUserAndDateTimeStartGreaterThanEqualAndDateTimeStartLessThanAndProjectIsNull(User user,LocalDateTime dateTimeStartMin,LocalDateTime dateTimeStartMax);
	
	List<Task> findByUserAndDateTimeStartGreaterThanEqual(User user,LocalDateTime dateTimeStartMin);
	
	void deleteByIdAndUser(Long id, User user);

}

