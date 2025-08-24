package com.pawan.taskmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    private String bio;

    private String photoUrl; // store file path or URL

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

	public Profile() {
		super();
		
	}

	public Profile(Long id, String fullName, String email, String bio, String photoUrl, User user) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.bio = bio;
		this.photoUrl = photoUrl;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Profile [id=" + id + ", fullName=" + fullName + ", email=" + email + ", bio=" + bio + ", photoUrl="
				+ photoUrl + ", user=" + user + "]";
	}
	
	

    
}

