package io.adagio.adagioapi.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.adagio.adagioapi.models.User;

public interface UserRepository extends JpaRepository<User, Long> {


	Optional<User> findByEmail(String email);
	Optional<User> findByLogin(String login);
}
