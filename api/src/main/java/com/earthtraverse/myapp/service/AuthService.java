package com.earthtraverse.myapp.service;

import com.earthtraverse.myapp.dto.request.RegisterRequest;
import com.earthtraverse.myapp.entity.User;
import com.earthtraverse.myapp.exception.AuthenticationException;
import com.earthtraverse.myapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserService userService;

    /**
     * Registers a new user with the provided register request.
     *
     * @param registerRequest The registration details
     * @return The created user
     */
    public User registerUser(RegisterRequest registerRequest) {
        Optional<User> existingUser = userService.findUserByUsernameOptional(registerRequest.getUsername());
        if (existingUser.isPresent()) {
            throw new AuthenticationException(String.format("User with username %s already exists", registerRequest.getUsername()));
        }

        String hashedPassword = BCrypt.hashpw(registerRequest.getPassword(), BCrypt.gensalt());
        User user = User.builder()
                .username(registerRequest.getUsername())
                .password(hashedPassword)
                .build();

        return userRepository.save(user);
    }

    /**
     * Finds a user by their username and verifies the provided password.
     *
     * @param username The username of the user
     * @param password The password to check
     * @return The authenticated user
     * @throws AuthenticationException if the password is incorrect
     */
    public User findUserByUsernameAndPassword(String username, String password) {
        User user = userService.findUserByUsername(username);

        if (!BCrypt.checkpw(password, user.getPassword())) {
            throw new AuthenticationException("Invalid password or username.");
        }

        return user;
    }

    /**
     * Logs a user in by storing their user ID in the HTTP session.
     *
     * @param session The HTTP session to store the user ID in
     * @param user    The user to log in
     */
    public void loginWithSession(HttpSession session, User user) {
        session.setAttribute("userId", user.getId());
    }

    /**
     * Retrieves the currently logged-in user from the HTTP session.
     *
     * @param session The HTTP session to retrieve the user from
     * @return The currently logged-in user
     * @throws AuthenticationException if no user is currently logged in
     */
    public User getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new AuthenticationException("User is not logged in.");
        }

        return userService.findUserById(userId);
    }

    /**
     * Retrieves the currently logged-in user from the HTTP session.
     *
     * @param session The HTTP session to retrieve the user from
     * @return An Optional of the currently logged-in user, or an empty Optional if no user is logged in
     */
    public Optional<User> getCurrentUserOptional(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return Optional.empty();
        }

        return userService.findUserByIdOptional(userId);
    }
}