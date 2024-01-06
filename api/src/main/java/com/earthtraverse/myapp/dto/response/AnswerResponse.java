package com.earthtraverse.myapp.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnswerResponse {
    Double latitudeGuess;
    Double longitudeGuess;
    int roundNumber;
    Double distance;
}