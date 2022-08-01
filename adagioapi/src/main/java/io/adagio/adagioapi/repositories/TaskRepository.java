package io.adagio.adagioapi.repositories;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	Optional<Task> findByIdAndUser(Long id, User user);
	
	void deleteByIdAndUser(Long id, User user);
	
	Optional<Task> findByTitleAndUser(String title, User user);
	
	Page<Task> findByProjectIdAndUser (Long id, User user);
	
	Page<Task> findByDateAndUser (LocalDateTime date, User user);

}
