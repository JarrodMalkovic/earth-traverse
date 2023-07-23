package com.earthtraverse.myapp.service;

import com.earthtraverse.myapp.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@RequiredArgsConstructor
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    /**
     * Calculates the average distance of answers a user has submitted in the last 30 days.
     * If the user has not submitted any answers in the last 30 days, the method returns 0.
     *
     * @param userId the user's ID
     * @return the average distance of the user's answers in the last 30 days
     */
    public double getAverageDistanceLast30Days(Long userId) {
        Instant oneMonthAgo = Instant.now().minus(30, ChronoUnit.DAYS);
        Double averageDistance = answerRepository.findAverageDistanceByUserIdAndTimestampAfter(userId, oneMonthAgo);

        return averageDistance != null ? averageDistance : 0;
    }
}
