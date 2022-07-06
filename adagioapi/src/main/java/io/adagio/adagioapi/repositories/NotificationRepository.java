package io.adagio.adagioapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
