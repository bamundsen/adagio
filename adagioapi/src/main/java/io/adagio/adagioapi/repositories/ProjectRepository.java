package io.adagio.adagioapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
