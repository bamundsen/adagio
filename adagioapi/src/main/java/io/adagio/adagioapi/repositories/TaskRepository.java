package io.adagio.adagioapi.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
	
	@Query(value = "SELECT * FROM tasks t WHERE t.title LIKE CONCAT ('%',?1,'%') AND t.user_id= ?2", nativeQuery = true)
	Page<Task> findByTitleAndUser_IdNative(String title, Long user_id, Pageable pageable);
	
	@Query(value = "SELECT * FROM tasks t WHERE t.title LIKE CONCAT ('%',?1,'%') AND t.user_id= ?2 AND t.project_id IS null", nativeQuery = true)
	Page<Task> findByTitleAndAndUser_IdAndProjectIsNullNative(String title, Long user_id, Pageable pageable);
	
	@Query(value = "SELECT * FROM tasks t WHERE t.title LIKE CONCAT ('%',?1,'%') AND t.user_id= ?2 AND (t.project_id IS null OR t.project_id = ?3)",
			nativeQuery = true)
	Page<Task> findByTitleAndAndUser_IdAndProjectIsNullOrProjectIsEqualNative(String title, Long user_id,Long project_id, Pageable pageable);
	
	Page<Task> findByProject_IdAndUser (Long project_id, User user, Pageable pageable);
}

