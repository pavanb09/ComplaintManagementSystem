package com.cms.cmsproject.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {
      
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	 @NotBlank(message = "Name is required")
	 @Column(nullable = false, length = 50)
	private String name;
	
	@Column(unique = true, nullable = false)
	private String email;

	@NotBlank(message = "Password is required")
    @Column(nullable = false, length = 255)
	private String password;
	
    @Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
    @Column(nullable = false)
	private String role;
     
	public User() {
		// TODO Auto-generated constructor stub
	}
	
	@PrePersist
	public void onCreate() {
	    this.createdAt = LocalDateTime.now();
	}

	public User(Integer id, String name, String email, String password, LocalDateTime createdAt,String role) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
		this.role=role;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", createdAt="
				+ createdAt + ", role=" + role + "]";
	}

	
}