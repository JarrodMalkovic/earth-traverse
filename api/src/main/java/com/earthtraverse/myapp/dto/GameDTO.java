package com.earthtraverse.myapp.dto;

import com.earthtraverse.myapp.entity.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDTO {
    Map map;
    Instant startTime;
    Instant endTime;
}
