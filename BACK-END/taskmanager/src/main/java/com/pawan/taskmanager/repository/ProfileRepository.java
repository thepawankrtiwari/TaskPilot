package com.pawan.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawan.taskmanager.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByUserId(Long userId);
}
