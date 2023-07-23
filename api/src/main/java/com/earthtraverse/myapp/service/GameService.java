package com.earthtraverse.myapp.service;

import com.earthtraverse.myapp.dto.GameDTO;
import com.earthtraverse.myapp.dto.request.AnswerRequest;
import com.earthtraverse.myapp.entity.*;
import com.earthtraverse.myapp.exception.AuthenticationException;
import com.earthtraverse.myapp.repository.AnswerRepository;
import com.earthtraverse.myapp.repository.GameRepository;
import com.earthtraverse.myapp.repository.LocationRepository;
import com.earthtraverse.myapp.repository.RoundRepository;
import com.earthtraverse.myapp.util.GeographyUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final LocationRepository locationRepository;
    private final RoundRepository roundRepository;
    private final AnswerRepository answerRepository;

    private final ModelMapper modelMapper;

    /**
     * Creates a new game with each round having a random location.
     * The locations are fetched from the provided map id.
     *
     * @param user  The user who is playing the game
     * @param mapId The id of the map to fetch the locations from
     * @return The created game
     */
    @Transactional()
    public Game createGame(Optional<User> user, Long mapId, int numberOfRounds) {
        Game game = Game.builder()
                .startTime(Instant.now())
                .user(user.orElse(null))
                .build();
        gameRepository.save(game);

        List<Location> roundLocations = locationRepository.findRandomLocationsByMapId(mapId, numberOfRounds);
        roundLocations.subList(0, Math.min(numberOfRounds, roundLocations.size()))
                .stream()
                .map(location -> Round.builder()
                        .game(game)
                        .number(roundLocations.indexOf(location) + 1)
                        .location(location)
                        .build())
                .forEach(round -> {
                    roundRepository.save(round);
                    game.addRound(round);
                });

        return game;
    }

    /**
     * Retrieves a game with the given id.
     *
     * @param gameId The id of the game to retrieve
     * @return The retrieved game
     * @throws EntityNotFoundException if no game exists with the given id
     */
    public Game getGame(Long gameId) {
        return gameRepository.findById(gameId).orElseThrow(() -> new EntityNotFoundException("Game with id " + gameId + " not found."));
    }

    /**
     * Submits an answer for a specific round in a game. The answer contains the guessed latitude and longitude.
     * The user who is allowed to submit the answer must be the same as the one who started the game.
     *
     * @param optionalUser  The user who is submitting the answer
     * @param gameId        The id of the game to submit the answer to
     * @param answerRequest The request containing the guessed latitude and longitude
     * @return The submitted answer
     * @throws IllegalArgumentException if the round number is invalid
     * @throws AuthenticationException  if the user is not authorized to answer
     */
    public Answer submitAnswer(Optional<User> optionalUser, Long gameId, AnswerRequest answerRequest) {
        Game game = getGame(gameId);
        List<Round> rounds = game.getRounds();

        if (rounds.size() <= answerRequest.getRoundNumber() || answerRequest.getRoundNumber() < 0) {
            throw new IllegalArgumentException("Invalid round number: " + answerRequest.getRoundNumber());
        }

        if (optionalUser.isPresent() && game.getUser().getId() != optionalUser.get().getId()) {
            throw new AuthenticationException("You are not authorized to answer this round.");
        }

        Round round = game.getRounds().get(answerRequest.getRoundNumber());
        Double locationLatitude = round.getLocation().getLatitude();
        Double locationLongitude = round.getLocation().getLongitude();
        Double distance = GeographyUtils.calculateDistance(locationLatitude, locationLongitude, answerRequest.getLatitudeGuess(), answerRequest.getLongitudeGuess());

        Answer answer = Answer.builder()
                .latitudeGuess(answerRequest.getLatitudeGuess())
                .longitudeGuess(answerRequest.getLongitudeGuess())
                .round(round)
                .distance(distance)
                .build();
        answerRepository.save(answer);

        return answer;
    }

    /**
     * Counts the total number of games a user has played in the last 30 days.
     *
     * @param userId the user's ID
     * @return the total number of games the user has played in the last 30 days
     */
    public int getTotalGamesLast30Days(Long userId) {
        Instant oneMonthAgo = Instant.now().minus(30, ChronoUnit.DAYS);

        return gameRepository.countByUserIdAndStartTimeAfter(userId, oneMonthAgo);
    }

    /**
     * Retrieves the 10 most recent games played by a specific user.
     *
     * @param userId the user's ID
     * @return a list of the 10 most recent games played by the user
     */
    public List<GameDTO> getLatestGames(Long userId) {
        List<Game> games = gameRepository.findLastByUserIdOrderByEndTimeDesc(userId, PageRequest.of(0, 10));

        return games.stream()
                .map(game -> modelMapper.map(game, GameDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * Calculates the average length of games a user has played in the last 30 days.
     * The length of a game is defined as the duration from its start time to its end time.
     *
     * @param userId the user's ID
     * @return the average length of games the user has played in the last 30 days, in seconds
     */
    public double getAverageGameLengthLast30Days(Long userId) {
        Instant oneMonthAgo = Instant.now().minus(30, ChronoUnit.DAYS);
        List<Game> games = gameRepository.findGamesByUserIdAndStartTimeAfter(userId, oneMonthAgo);

        games = games.stream()
                .filter(game -> game.getEndTime() != null)
                .collect(Collectors.toList());

        if (games.isEmpty()) {
            return 0;
        }

        double totalLengthInSeconds = games.stream()
                .mapToDouble(game -> Duration.between(game.getStartTime(), game.getEndTime()).getSeconds())
                .sum();

        return totalLengthInSeconds / games.size();
    }
}