package com.earthtraverse.myapp.dto.response;

import com.earthtraverse.myapp.entity.Round;
import com.earthtraverse.myapp.entity.User;
import lombok.Value;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Value
public class GameResponse {
    private Long id;
    private Instant startTime;
    private Instant endTime;
    private User user;
    private List<Round> rounds = new ArrayList<>();
}
