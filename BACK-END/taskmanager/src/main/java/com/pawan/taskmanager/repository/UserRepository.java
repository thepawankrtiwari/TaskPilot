package com.pawan.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawan.taskmanager.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
