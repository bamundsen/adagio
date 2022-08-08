package io.adagio.adagioapi.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.adagio.adagioapi.models.Project;
import io.adagio.adagioapi.models.Task;
import io.adagio.adagioapi.models.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

	Optional<Project> findByIdAndUser(Long id, User user);
	Page<Project> findByUser(User user , Pageable paginacao);
	void deleteByIdAndUser(Long id, User user);
	
	@Query(value = "SELECT * FROM projects p WHERE p.title LIKE CONCAT ('%',?1,'%') AND p.user_id= ?2", nativeQuery = true)
	Page<Project> findByTitleAndUser_IdNative(String title, Long user_id, Pageable pageable);
}
