package io.adagio.adagioapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	

}
