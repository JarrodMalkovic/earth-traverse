package com.earthtraverse.myapp.dto;

import com.earthtraverse.myapp.entity.Round;
import com.earthtraverse.myapp.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.time.Instant;

@Data
@NoArgsConstructor
public class LeaderboardDTO {
    private static final ModelMapper modelMapper = new ModelMapper();
    private RoundDTO round;
    private UserDTO user;
    private Double distance;
    private Instant timestamp;

    // Constructor to be used by the JPQL query
    public LeaderboardDTO(Round round, User user, Double distance, Instant timestamp) {
        this.round = convertToRoundDTO(round);
        this.user = convertToUserDTO(user);
        this.distance = distance;
        this.timestamp = timestamp;
    }

    private RoundDTO convertToRoundDTO(Round round) {
        if (round == null) {
            return null;
        }

        return modelMapper.map(round, RoundDTO.class);
    }

    private UserDTO convertToUserDTO(User user) {
        if (user == null) {
            return null;
        }

        return modelMapper.map(user, UserDTO.class);
    }
}