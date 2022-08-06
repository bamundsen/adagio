package io.adagio.adagioapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Notification;
import io.adagio.adagioapi.models.Task;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	
	
	public List<Notification> findByTask(Task task);
	
	public void deleteByTask(Task task);
}
