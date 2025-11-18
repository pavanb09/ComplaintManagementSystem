package com.cms.cmsproject.controller;

import java.util.List;
import java.util.Map;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cms.cmsproject.dto.LoginRequest;
import com.cms.cmsproject.dto.RegisterRequest;
import com.cms.cmsproject.entity.User;
import com.cms.cmsproject.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Value("${app.admin.secret}")
    private String adminSecretKey;

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        User user = userService.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("status", "error", "message", "User Not Found"));
        }

        if (!loginRequest.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "error", "message", "Invalid Credentials"));
        }

        return ResponseEntity.ok(Map.of("status", "success", "message", "Login Successful","user",user));
    }


    @PostMapping("/register/user")
    public User createUser(@RequestBody User user) {
    	   user.setRole("Student");
        return userService.createUser(user);
    }
   

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
    	   request.setRole("admin");
        if (request.getRole().equalsIgnoreCase("admin")) {

            if (!request.getAdminKey().equals(adminSecretKey)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("You are not eligible to register as admin. Invalid admin key.");
            }
        }

     
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

    
        return ResponseEntity.ok(userService.createUser(user));
    }


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return "User deleted with ID: " + id;
    }
}