package com.earthtraverse.myapp.repository;

import com.earthtraverse.myapp.dto.LeaderboardDTO;
import com.earthtraverse.myapp.entity.Answer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("SELECT AVG(a.distance) FROM Answer a WHERE a.round.game.user.id = :userId AND a.timestamp > :timestamp")
    Double findAverageDistanceByUserIdAndTimestampAfter(@Param("userId") Long userId, @Param("timestamp") Instant timestamp);

    @Query("SELECT new com.earthtraverse.myapp.dto.LeaderboardDTO(r, u, a.distance, a.timestamp) " +
            "FROM Answer a JOIN a.round r JOIN r.game g JOIN g.user u " +
            "ORDER BY a.distance ASC")
    List<LeaderboardDTO> findLeaderboard(Pageable pageable);
}