package com.earthtraverse.myapp.repository;

import com.earthtraverse.myapp.entity.Game;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    int countByUserIdAndStartTimeAfter(Long userId, Instant startTime);

    @Query("SELECT g FROM Game g WHERE g.user.id = :userId ORDER BY g.endTime DESC")
    List<Game> findLastByUserIdOrderByEndTimeDesc(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT g FROM Game g WHERE g.user.id = :userId AND g.startTime >= :oneMonthAgo")
    List<Game> findGamesByUserIdAndStartTimeAfter(@Param("userId") Long userId, @Param("oneMonthAgo") Instant oneMonthAgo);
}