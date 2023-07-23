package com.earthtraverse.myapp.controller;

import com.earthtraverse.myapp.dto.response.UserStatsResponse;
import com.earthtraverse.myapp.entity.User;
import com.earthtraverse.myapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{username}/profile")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findUserByUsername(username);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/{username}/statistics")
    public ResponseEntity<UserStatsResponse> getUserStatisticsByUsername(@PathVariable String username) {
        UserStatsResponse userStatsResponse = userService.getUserStatsByUsername(username);

        return ResponseEntity.ok(userStatsResponse);
    }
}
