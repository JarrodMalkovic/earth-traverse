package com.earthtraverse.myapp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
public class GameDTO {
    MapDTO map;
    Instant startTime;
    Instant endTime;
}
