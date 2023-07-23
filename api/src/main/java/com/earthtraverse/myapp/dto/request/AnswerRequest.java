package com.earthtraverse.myapp.dto.request;

import javax.validation.constraints.NotBlank;

public class AnswerRequest {
    @NotBlank
    private Double latitudeGuess;

    @NotBlank
    private Double longitudeGuess;

    @NotBlank
    private int roundNumber;

    public Double getLatitudeGuess() {
        return latitudeGuess;
    }

    public Double getLongitudeGuess() {
        return longitudeGuess;
    }

    public int getRoundNumber() {
        return roundNumber;
    }
}
