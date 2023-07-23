package com.earthtraverse.myapp.dto.response;

import lombok.Value;

@Value
public class AnswerResponse {
    Double latitudeGuess;
    Double longitudeGuess;
    int roundNumber;
    Double distance;
}