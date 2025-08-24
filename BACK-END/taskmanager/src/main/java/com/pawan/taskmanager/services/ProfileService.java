package com.pawan.taskmanager.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawan.taskmanager.entity.Profile;
import com.pawan.taskmanager.repository.ProfileRepository;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }
}
