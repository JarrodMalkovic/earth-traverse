package com.earthtraverse.myapp.service;

import com.earthtraverse.myapp.dto.GameDTO;
import com.earthtraverse.myapp.dto.response.UserStatsResponse;
import com.earthtraverse.myapp.entity.User;
import com.earthtraverse.myapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final AnswerService answerService;

    private final GameService gameService;

    private final ModelMapper modelMapper;

    /**
     * Retrieves a user by their username.
     *
     * @param username The username of the user to retrieve
     * @return The retrieved user
     * @throws EntityNotFoundException if no user exists with the given username
     */
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException(String.format("User with username %s not found.", username)));
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param userId The ID of the user to retrieve
     * @return The retrieved user
     * @throws EntityNotFoundException if no user exists with the given ID
     */
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException(String.format("User with id %d not found.", userId)));
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param userId The ID of the user to retrieve
     * @return An Optional<User> that contains the retrieved user if one exists with the given ID
     */
    public Optional<User> findUserByIdOptional(Long userId) {
        return userRepository.findById(userId);
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username The username of the user to retrieve
     * @return An Optional<User> that contains the retrieved user if one exists with the given ID
     */
    public Optional<User> findUserByUsernameOptional(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Retrieves various statistics related to a user, such as their average game distance and total number of games played
     * in the last 30 days.
     *
     * @param username the username of the user for which statistics are to be retrieved
     * @return a UserStatsResponse object containing the user's statistics
     */
    public UserStatsResponse getUserStatsByUsername(String username) {
        User user = findUserByUsername(username);

        CompletableFuture<Double> averageDistanceFuture = CompletableFuture.supplyAsync(() ->
                answerService.getAverageDistanceLast30Days(user.getId()));

        CompletableFuture<Integer> totalGamesFuture = CompletableFuture.supplyAsync(() ->
                gameService.getTotalGamesLast30Days(user.getId()));

        CompletableFuture<List<GameDTO>> latestGamesFuture = CompletableFuture.supplyAsync(() ->
                gameService.getLatestGames(user.getId()));

        CompletableFuture<Double> averageGameLengthFuture = CompletableFuture.supplyAsync(() ->
                gameService.getAverageGameLengthLast30Days(user.getId()));

        CompletableFuture.allOf(averageDistanceFuture, totalGamesFuture, latestGamesFuture, averageGameLengthFuture).join();

        return UserStatsResponse.builder()
                .userId(user.getId())
                .averageDistanceLast30Days(averageDistanceFuture.join())
                .totalGamesLast30Days(totalGamesFuture.join())
                .averageGameLengthLast30Days(averageGameLengthFuture.join())
                .latestGames(latestGamesFuture.join())
                .build();
    }
}