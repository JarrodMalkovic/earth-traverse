package com.earthtraverse.myapp.repository;

import com.earthtraverse.myapp.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("SELECT AVG(a.distance) FROM Answer a WHERE a.round.game.user.id = :userId AND a.timestamp > :timestamp")
    Double findAverageDistanceByUserIdAndTimestampAfter(@Param("userId") Long userId, @Param("timestamp") Instant timestamp);
}