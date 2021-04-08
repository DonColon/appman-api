package com.dardan.rrafshi.appman.api.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dardan.rrafshi.appman.api.repository.model.Developer;


@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Integer>
{
	List<Developer> findByUserNameContaining(String userName, Pageable paging);

	List<Developer> findByEmailContaining(String email, Pageable paging);

	Developer findByUserName(String userName);

	Developer findByEmail(String email);
}
