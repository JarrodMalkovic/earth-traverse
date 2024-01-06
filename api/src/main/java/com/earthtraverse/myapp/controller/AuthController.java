package com.earthtraverse.myapp.controller;

import com.earthtraverse.myapp.dto.request.RegisterRequest;
import com.earthtraverse.myapp.entity.User;
import com.earthtraverse.myapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController()
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    /**
     * Register a new user.
     *
     * @param registerRequest Contains the username and password
     * @param session         HTTP session
     * @return The registered user
     */
    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(
            @RequestBody RegisterRequest registerRequest,
            HttpSession session
    ) {
        User registeredUser = authService.registerUser(registerRequest);
        authService.loginWithSession(session, registeredUser);

        return ResponseEntity.ok(registeredUser);
    }

    /**
     * Endpoint to login a user.
     *
     * @param loginRequest DTO containing the username and password
     * @param session      Current HTTP session
     * @return ResponseEntity containing the logged-in user
     */
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(
            @RequestBody RegisterRequest loginRequest,
            HttpSession session
    ) {
        User user = authService.findUserByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        authService.loginWithSession(session, user);

        return ResponseEntity.ok(user);
    }

    /**
     * Endpoint to logout a user.
     *
     * @param session Current HTTP session
     * @return ResponseEntity with no body
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();

        return ResponseEntity.ok().build();
    }

    /**
     * Endpoint to get the currently logged-in user.
     *
     * @param session Current HTTP session
     * @return ResponseEntity containing the currently logged-in user
     */
    @GetMapping("/self")
    public ResponseEntity<?> getSelf(HttpSession session) {
        User user = authService.getCurrentUser(session);

        return ResponseEntity.ok(user);
    }
}