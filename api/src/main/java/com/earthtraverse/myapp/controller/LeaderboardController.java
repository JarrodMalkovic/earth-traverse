package com.earthtraverse.myapp.controller;

import com.earthtraverse.myapp.dto.LeaderboardDTO;
import com.earthtraverse.myapp.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leaderboard")
public class LeaderboardController {
    private final LeaderboardService leaderboardService;
    private final ModelMapper modelMapper;

    /**
     * Retrieves the leaderboard data.
     *
     * @return List of leaderboard entries
     */
    @GetMapping
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboard() {
        List<LeaderboardDTO> leaderboard = leaderboardService.getLeaderboard(PageRequest.of(0, 20)).stream()
                .map(entry -> modelMapper.map(entry, LeaderboardDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(leaderboard);
    }
}
