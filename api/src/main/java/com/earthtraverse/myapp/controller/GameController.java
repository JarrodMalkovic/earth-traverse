package com.earthtraverse.myapp.controller;

import com.earthtraverse.myapp.dto.request.AnswerRequest;
import com.earthtraverse.myapp.dto.request.CreateGameRequest;
import com.earthtraverse.myapp.dto.response.AnswerResponse;
import com.earthtraverse.myapp.dto.response.GameResponse;
import com.earthtraverse.myapp.service.AuthService;
import com.earthtraverse.myapp.service.GameService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameController {
    private final GameService gameService;
    private final AuthService authService;
    private final ModelMapper modelMapper;

    /**
     * Create a new game.
     *
     * @param createGameRequest Contains the number of rounds and map id
     * @param session           HTTP session
     * @return The created game
     */
    @PostMapping
    public ResponseEntity<GameResponse> createGame(@RequestBody CreateGameRequest createGameRequest, HttpSession session) {
        return authService.getCurrentUserOptional(session)
                .map(user -> gameService.createGame(Optional.of(user), createGameRequest.getMapId(), createGameRequest.getNumberOfRounds()))
                .map(game -> modelMapper.map(game, GameResponse.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    /**
     * Get a game by its id.
     *
     * @param gameId The id of the game to retrieve
     * @return The retrieved game
     */
    @GetMapping("/{gameId}")
    public ResponseEntity<GameResponse> getGame(@PathVariable Long gameId) {
        return Optional.ofNullable(gameService.getGame(gameId))
                .map(game -> modelMapper.map(game, GameResponse.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Submit an answer for a specific round in a game.
     *
     * @param gameId        The id of the game to submit the answer to
     * @param answerRequest Contains the guessed latitude and longitude
     * @param session       HTTP session
     * @return The submitted answer
     */
    @PostMapping("/{gameId}/answer")
    public ResponseEntity<AnswerResponse> submitAnswer(@PathVariable Long gameId, @RequestBody AnswerRequest answerRequest, HttpSession session) {
        return authService.getCurrentUserOptional(session)
                .map(user -> gameService.submitAnswer(Optional.of(user), gameId, answerRequest))
                .map(answer -> modelMapper.map(answer, AnswerResponse.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
}

