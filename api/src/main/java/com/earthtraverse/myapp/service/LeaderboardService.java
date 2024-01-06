package com.earthtraverse.myapp.service;

import com.earthtraverse.myapp.dto.LeaderboardDTO;
import com.earthtraverse.myapp.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LeaderboardService {
    private final AnswerRepository answerRepository;

    public List<LeaderboardDTO> getLeaderboard(Pageable pageable) {
        return answerRepository.findLeaderboard(pageable);
    }
}
