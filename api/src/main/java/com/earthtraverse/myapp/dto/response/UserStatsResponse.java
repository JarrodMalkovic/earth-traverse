package com.earthtraverse.myapp.dto.response;

import com.earthtraverse.myapp.dto.GameDTO;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class UserStatsResponse {
    Long userId;
    int totalGamesLast30Days;
    Double averageDistanceLast30Days;
    Double averageGameLengthLast30Days;
    List<GameDTO> latestGames;
}