package com.earthtraverse.myapp.dto.response;

import com.earthtraverse.myapp.dto.MapDTO;
import com.earthtraverse.myapp.dto.RoundDTO;
import com.earthtraverse.myapp.dto.UserDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
public class GameResponse {
    private Long id;
    private Instant startTime;
    private Instant endTime;
    private UserDTO user;
    private MapDTO map;
    private List<RoundDTO> rounds;
}
